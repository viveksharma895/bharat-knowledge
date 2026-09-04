# Bharat Knowledge — Data Model

This document describes the core domain models for the Bharat Knowledge platform:

- **Person** — a notable individual
- **Source** — where factual information comes from
- **Claim** — a factual statement tied to an entity and backed by sources

## Core Principle

```text
FACT → SOURCE → VERIFY → PUBLISH
```

The database is designed so every factual assertion can be traced back to a
verifiable source.

## Models

### Person

Represents a biographical entry for an individual.

Fields: `name`, `slug`, `aliases`, `shortBio`, `biography`, `dateOfBirth`,
`dateOfDeath`, `placeOfBirth`, `nationality`, `occupations`, `categories`,
`image`, `status`, `createdAt`, `updatedAt`

- `slug` is unique and used in public URLs (e.g. `/people/sachin-tendulkar`).
- `categories` stores lightweight references (`{ slug, label? }`) so it can be
  upgraded to a real `Category` model later without redesign.
- `image` stores metadata only (URL, alt, caption, license, source), never the
  binary.
- `status` is an editorial lifecycle enum: `draft | review | published | archived`.

### Source

Represents where knowledge or factual information came from.

Fields: `name`, `url`, `sourceType`, `publisher`, `description`, `license`,
`licenseUrl`, `attributionRequired`, `commercialUseAllowed`,
`redistributionAllowed`, `isVerified`, `lastCheckedAt`, `createdAt`, `updatedAt`

- `sourceType` is an enum: `government | official | court | parliament |
  election | research | university | book | news | organization | database | other`.
- `isVerified` reflects editorial/source review — **not** an automatic trust score.

### Claim

Represents a factual statement that can be independently sourced and reviewed.

Fields: `entityType`, `entityId`, `property`, `value`, `sources`,
`verificationStatus`, `confidence`, `reviewedBy`, `reviewedAt`, `createdAt`,
`updatedAt`

- `entityType` is currently `person`; designed to extend to `place`, `organization`,
  `event` later.
- `value` is a discriminated structure with a `valueType` (`string | number |
  boolean | date | object | array | reference`) so it stays typed and extensible.
- `sources` holds MongoDB ObjectId references to `Source` documents — the Source
  document is **not** duplicated inside the Claim.
- `verificationStatus` is an editorial enum: `pending | verified | rejected |
  needs_review`.
- `confidence` (0–1) is strictly separate from `verificationStatus`. A high
  confidence never implies verification; human editorial review is authoritative.

## Relationships

```text
Person
  │
  │ has
  ▼
Claim
  │
  │ supported by
  ▼
Source
```

A Person can have many Claims. Each Claim points at one Person via
`entityType + entityId`. Each Claim can reference one or more Sources.

```text
Person
  │
  ├── Claim: date of birth ──► Source A
  ├── Claim: place of birth ─► Source A, Source B
  ├── Claim: occupation     ─► Source C
  └── Claim: award          ─► Source C
```

### Why Claims are separated from People

- A single fact can change as better sources are found; separating Claims lets us
  revise one statement without rewriting the whole Person.
- Multiple Claims can share sources, and multiple sources can support a single
  claim.
- Claims carry their own editorial verification state, independent of the Person.
- It enables answering *"why do we believe this?"* directly, per fact.
- It scales better than storing a growing array of claims inside each Person.

## Indexes

### Person

- `slug` → unique (with `index`)
- `name` → index
- `status` → index

### Source

- `name` → index
- `sourceType` → index
- `url` → index

### Claim

- `entityType + entityId` → compound index
- `verificationStatus` → index

No premature indexes were added beyond these.

## Future Compatibility

The current design leaves room for later models without redesigning
Person/Source/Claim:

- `Place`, `Organization`, `Event` — new `entityType` values on Claim.
- `Category` — `Person.categories` already uses light references.
- `Revision`, `Correction`, `User`, `Import` — can reference entities by `_id`.

These are intentionally **not** implemented yet.