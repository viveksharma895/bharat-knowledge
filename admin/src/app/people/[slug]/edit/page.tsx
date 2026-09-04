'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TagInput } from '@/components/ui/tag-input';
import { peopleApi, STATUS_OPTIONS } from '@/lib/api/people';
import { ApiClientError } from '@/lib/api/client';
import { showToast, ToastContainer } from '@/components/ui/toast';
import type { Person, PersonStatus, CategoryRef } from '@/types/people';
import { ArrowLeft, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { slugify, isValidUrl } from '@/lib/utils';

export default function EditPersonPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const [personId, setPersonId] = useState('');
  const [name, setName] = useState('');
  const [slugVal, setSlugVal] = useState('');
  const [aliases, setAliases] = useState<string[]>([]);
  const [shortBio, setShortBio] = useState('');
  const [biography, setBiography] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfDeath, setDateOfDeath] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [nationality, setNationality] = useState<string[]>([]);
  const [occupations, setOccupations] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryRef[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [imageLicense, setImageLicense] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [status, setStatus] = useState<PersonStatus>('draft');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function loadPerson() {
    setLoading(true);
    setLoadError(null);
    setNotFound(false);
    setPersonId('');
    try {
      const res = await peopleApi.getBySlug(slug);
      populateForm(res.data);
    } catch (err) {
      if (err instanceof ApiClientError) {
        if (err.status === 404) {
          setNotFound(true);
        } else {
          setLoadError(`Unable to load this person. ${err.message}`);
        }
      } else {
        setLoadError(
          'Unable to load this person. Please check the Bharat Knowledge API connection and try again.',
        );
      }
    } finally {
      setLoading(false);
    }
  }

  function populateForm(person: Person) {
    setPersonId(person._id || '');
    setName(person.name || '');
    setSlugVal(person.slug || '');
    setAliases(Array.isArray(person.aliases) ? person.aliases : []);
    setShortBio(person.shortBio || '');
    setBiography(person.biography || '');
    setDateOfBirth(person.dateOfBirth?.slice(0, 10) || '');
    setDateOfDeath(person.dateOfDeath?.slice(0, 10) || '');
    setPlaceOfBirth(person.placeOfBirth || '');
    setNationality(Array.isArray(person.nationality) ? person.nationality : []);
    setOccupations(Array.isArray(person.occupations) ? person.occupations : []);
    setCategories(
      Array.isArray(person.categories)
        ? person.categories.map((c) => ({ slug: c.slug, label: c.label || c.slug }))
        : [],
    );
    setImageUrl(person.image?.url || '');
    setImageAlt(person.image?.alt || '');
    setImageCaption(person.image?.caption || '');
    setImageLicense(person.image?.license || '');
    setImageSource(person.image?.source || '');
    setStatus(person.status || 'draft');
  }

  useEffect(() => {
    loadPerson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  function clearFieldError(field: string) {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validate(): boolean {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Name is required.';
    if (!slugVal.trim()) errors.slug = 'Slug is required.';
    else if (/[A-Z]/.test(slugVal)) errors.slug = 'Slug should be lowercase.';
    else if (/\s/.test(slugVal)) errors.slug = 'Slug should not contain spaces.';
    if (shortBio.length > 500) errors.shortBio = 'Short Bio must be 500 characters or fewer.';
    if (imageUrl && !isValidUrl(imageUrl)) errors.imageUrl = 'Please enter a valid URL.';
    if (imageSource && !isValidUrl(imageSource)) errors.imageSource = 'Please enter a valid URL.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (!personId) {
      setSubmitError('Unable to identify the person to update.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload: Record<string, unknown> = {
        name: name.trim(),
        slug: slugVal.trim().toLowerCase(),
        aliases,
        shortBio: shortBio.trim(),
        biography: biography.trim(),
        placeOfBirth: placeOfBirth.trim(),
        nationality,
        occupations,
        categories: categories.map((c) => ({
          slug: c.slug,
          label: c.label,
        })),
        status,
      };

      if (dateOfBirth) payload.dateOfBirth = dateOfBirth;
      if (dateOfDeath) payload.dateOfDeath = dateOfDeath;

      const hasImage = imageUrl.trim() || imageAlt.trim() || imageCaption.trim() || imageLicense.trim() || imageSource.trim();
      if (hasImage) {
        payload.image = {
          url: imageUrl.trim(),
          alt: imageAlt.trim(),
          caption: imageCaption.trim(),
          license: imageLicense.trim(),
          source: imageSource.trim(),
        };
      }

      await peopleApi.update(personId, payload);
      showToast('Person updated successfully.', 'success');
      router.push('/people');
    } catch (err) {
      if (err instanceof ApiClientError) {
        if (err.status === 409) {
          setSubmitError('A person with this slug already exists.');
        } else if (err.status === 400) {
          const msg = Array.isArray(err.data.message)
            ? err.data.message.join(', ')
            : err.data.message;
          setSubmitError(`Validation error: ${msg}`);
        } else if (err.status === 404) {
          setSubmitError('Person not found.');
        } else if (err.status >= 500) {
          setSubmitError('Unable to update person. Please try again.');
        } else {
          setSubmitError(err.message);
        }
      } else {
        setSubmitError(
          'Unable to connect to the Bharat Knowledge API. Please check that the server is running and try again.',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/people" className="hover:text-foreground transition-colors">
            People
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Edit Person</span>
        </nav>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-muted animate-pulse" />
          <div>
            <div className="h-7 w-32 rounded bg-muted animate-pulse" />
            <div className="h-4 w-48 rounded bg-muted animate-pulse mt-2" />
          </div>
        </div>
        <div className="space-y-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-lg border bg-card p-5 space-y-4">
              <div className="h-5 w-40 rounded bg-muted animate-pulse" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-16 rounded bg-muted animate-pulse" />
                  <div className="h-8 w-full rounded bg-muted animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-12 rounded bg-muted animate-pulse" />
                  <div className="h-8 w-full rounded bg-muted animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/people" className="hover:text-foreground transition-colors">
            People
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Edit Person</span>
        </nav>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertCircle className="h-10 w-10 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-medium text-muted-foreground mb-1">
            Person not found.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            The person you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/people">Back to People</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/people" className="hover:text-foreground transition-colors">
            People
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Edit Person</span>
        </nav>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertCircle className="h-10 w-10 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-medium text-muted-foreground mb-1">
            Unable to load this person.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Please check the Bharat Knowledge API connection and try again.
          </p>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={loadPerson}>
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
              Retry
            </Button>
            <Button asChild>
              <Link href="/people">Back to People</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <ToastContainer />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/people" className="hover:text-foreground transition-colors">
          People
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Edit Person</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href="/people">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to People</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Person</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Update the knowledge profile information.
          </p>
        </div>
      </div>

      {/* Submit error banner */}
      {submitError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Information */}
        <Section title="Basic Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name" required error={fieldErrors.name}>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearFieldError('name');
                }}
                placeholder="e.g. Sachin Tendulkar"
              />
            </Field>
            <Field label="Slug" required error={fieldErrors.slug}>
              <Input
                value={slugVal}
                onChange={(e) => {
                  setSlugVal(e.target.value);
                  clearFieldError('slug');
                }}
                placeholder="e.g. sachin-tendulkar"
              />
            </Field>
          </div>
          <Field label="Aliases">
            <TagInput
              value={aliases}
              onChange={setAliases}
              placeholder="Type alias and press Enter"
            />
          </Field>
          <Field label="Short Bio" error={fieldErrors.shortBio}>
            <Input
              value={shortBio}
              onChange={(e) => {
                setShortBio(e.target.value);
                clearFieldError('shortBio');
              }}
              placeholder="A brief one-line description"
              maxLength={500}
            />
          </Field>
          <Field label="Biography">
            <textarea
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              placeholder="Full biography text..."
              rows={6}
              className="flex w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 md:text-sm min-h-[120px]"
            />
          </Field>
        </Section>

        {/* Section 2: Personal Information */}
        <Section title="Personal Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Date of Birth">
              <Input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </Field>
            <Field label="Date of Death">
              <Input
                type="date"
                value={dateOfDeath}
                onChange={(e) => setDateOfDeath(e.target.value)}
              />
            </Field>
          </div>
          <Field label="Place of Birth">
            <Input
              value={placeOfBirth}
              onChange={(e) => setPlaceOfBirth(e.target.value)}
              placeholder="e.g. Mumbai, India"
            />
          </Field>
          <Field label="Nationality">
            <TagInput
              value={nationality}
              onChange={setNationality}
              placeholder="Type nationality and press Enter"
            />
          </Field>
        </Section>

        {/* Section 3: Professional Information */}
        <Section title="Professional Information">
          <Field label="Occupations">
            <TagInput
              value={occupations}
              onChange={setOccupations}
              placeholder="Type occupation and press Enter"
            />
          </Field>
          <Field label="Categories">
            <TagInput
              value={categories.map((c) => c.label || c.slug)}
              onChange={(labels) =>
                setCategories(
                  labels.map((label) => {
                    const existing = categories.find((c) => c.label === label || c.slug === label);
                    return { slug: existing?.slug || slugify(label), label };
                  }),
                )
              }
              placeholder="Type category and press Enter"
            />
          </Field>
        </Section>

        {/* Section 4: Image */}
        <Section title="Image">
          <Field label="Image URL" error={fieldErrors.imageUrl}>
            <Input
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                clearFieldError('imageUrl');
              }}
              placeholder="https://example.com/image.jpg"
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Alt Text">
              <Input
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Descriptive alt text for accessibility"
              />
            </Field>
            <Field label="Caption">
              <Input
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
                placeholder="Image caption"
              />
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="License">
              <Input
                value={imageLicense}
                onChange={(e) => setImageLicense(e.target.value)}
                placeholder="e.g. CC BY 4.0"
              />
            </Field>
            <Field label="Source URL" error={fieldErrors.imageSource}>
              <Input
                value={imageSource}
                onChange={(e) => {
                  setImageSource(e.target.value);
                  clearFieldError('imageSource');
                }}
                placeholder="https://example.com/source"
              />
            </Field>
          </div>
        </Section>

        {/* Section 5: Editorial */}
        <Section title="Editorial">
          <Field label="Status">
            <Select value={status} onValueChange={(val) => setStatus(val as PersonStatus)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </Section>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/people">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-card p-5 space-y-4">
      <h2 className="text-base font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
