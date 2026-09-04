'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import type { PersonStatus } from '@/types/people';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { slugify, isValidUrl } from '@/lib/utils';

export default function NewPersonPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [autoSlug, setAutoSlug] = useState(true);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [aliases, setAliases] = useState<string[]>([]);
  const [shortBio, setShortBio] = useState('');
  const [biography, setBiography] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfDeath, setDateOfDeath] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [nationality, setNationality] = useState<string[]>([]);
  const [occupations, setOccupations] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [imageLicense, setImageLicense] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [status, setStatus] = useState<PersonStatus>('draft');

  function handleNameChange(value: string) {
    setName(value);
    if (autoSlug) {
      setSlug(slugify(value));
    }
    if (fieldErrors.name) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.name;
        return next;
      });
    }
  }

  function handleSlugChange(value: string) {
    setAutoSlug(false);
    setSlug(value);
    if (fieldErrors.slug) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.slug;
        return next;
      });
    }
  }

  function regenerateSlug() {
    setAutoSlug(true);
    setSlug(slugify(name));
  }

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
    if (!slug.trim()) errors.slug = 'Slug is required.';
    else if (/[A-Z]/.test(slug)) errors.slug = 'Slug should be lowercase.';
    else if (/\s/.test(slug)) errors.slug = 'Slug should not contain spaces.';
    if (shortBio.length > 500) errors.shortBio = 'Short Bio must be 500 characters or fewer.';
    if (imageUrl && !isValidUrl(imageUrl)) errors.imageUrl = 'Please enter a valid URL.';
    if (imageSource && !isValidUrl(imageSource)) errors.imageSource = 'Please enter a valid URL.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const payload: Record<string, unknown> = {
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        status,
      };

      if (aliases.length) payload.aliases = aliases;
      if (shortBio.trim()) payload.shortBio = shortBio.trim();
      if (biography.trim()) payload.biography = biography.trim();
      if (dateOfBirth) payload.dateOfBirth = dateOfBirth;
      if (dateOfDeath) payload.dateOfDeath = dateOfDeath;
      if (placeOfBirth.trim()) payload.placeOfBirth = placeOfBirth.trim();
      if (nationality.length) payload.nationality = nationality;
      if (occupations.length) payload.occupations = occupations;

      if (categories.length) {
        payload.categories = categories.map((label) => ({
          slug: slugify(label),
          label,
        }));
      }

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

      await peopleApi.create(payload);
      showToast('Person created successfully.', 'success');
      router.push('/people');
    } catch (err) {
      if (err instanceof ApiClientError) {
        if (err.status === 409) {
          setError('A person with this slug already exists.');
        } else if (err.status === 400) {
          const msg = Array.isArray(err.data.message)
            ? err.data.message.join(', ')
            : err.data.message;
          setError(`Validation error: ${msg}`);
        } else if (err.status >= 500) {
          setError('Unable to create person. Please try again.');
        } else {
          setError(err.message);
        }
      } else {
        setError(
          'Unable to connect to the Bharat Knowledge API. Please check that the server is running and try again.',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
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
        <span className="text-foreground font-medium">Create Person</span>
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
          <h1 className="text-2xl font-bold">Create Person</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Add a new knowledge profile to Bharat Knowledge.
          </p>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Information */}
        <Section title="Basic Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name" required error={fieldErrors.name}>
              <Input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Sachin Tendulkar"
              />
            </Field>
            <Field label="Slug" required error={fieldErrors.slug}>
              <div className="flex items-center gap-2">
                <Input
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="e.g. sachin-tendulkar"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={regenerateSlug}
                  className="shrink-0"
                >
                  Auto
                </Button>
              </div>
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
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                  clearFieldError('dateOfBirth');
                }}
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
              value={categories}
              onChange={setCategories}
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
            {isSubmitting ? 'Creating...' : 'Create Person'}
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
