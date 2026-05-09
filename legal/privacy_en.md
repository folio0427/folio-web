# Folio Privacy Policy

> **Version** v0.1 ｜ **Effective Date** TBD ｜ **Last Updated** 2026-05-09 ｜ **Status** Draft

This policy describes how Folio collects, uses, stores, and shares your personal data, and your rights.

> **This is a draft outline.** Final policy will be reviewed by a Taiwan-licensed attorney (with GDPR consultant). For questions: [folio0427@gmail.com](mailto:folio0427@gmail.com).

---

## 01　Scope & Legal Basis

- Applies to Folio app and related services
- Primary: Taiwan Personal Data Protection Act (PDPA)
- EU users: GDPR
- California users: CCPA
- App Store / Google Play privacy requirements observed

## 02　Data We Collect

### Provided at registration

- Google / Apple OAuth identifier (uid + email)
- Nickname
- Gender
- Date of birth (for 18+ verification + age display)
- Favorite book categories (max 5)
- Personality answers (up to 3, optional)
- Mode (Pure Book Friend / Open to Connection / Open)

### Generated through usage

- Posts (title, motivation, expected partner, weeks, progress, category)
- Applications (title, progress, motivation, self-offer, note)
- Chat messages (incl. canned, quotes, progress updates)
- Reflections (25%, 100%, anytime)
- Bookshelf (own books, collected quotes)
- Match records (partner, unlock time, end time)
- Device info: OS version, app version, language, push token, device ID (de-identified)
- IP address (security and fraud prevention)
- Activity logs (login time, click stats)

### Not collected

- Photos, avatars (not enabled in v1)
- Bank, credit card information
- Precise GPS
- Contacts
- Phone number
- Microphone, camera (unless future feature with explicit consent)

## 03　Purposes

- Account creation, login, maintenance
- Matching algorithm
- 18+ verification
- Service improvement (de-identified analytics)
- Fraud and abuse detection
- Customer service
- Legal compliance
- Marketing push (separately consented, withdrawable)

## 04　Third-Party Sharing

### Service providers (data processors)

- **Supabase Inc.** (database, storage, auth, Realtime) — US / EU hosts
- **Firebase Cloud Messaging (FCM) by Google LLC** (push) — global edge
- **Apple Push Notification service (APNs)** (iOS push) — global edge
- **Google LLC** (Google OAuth)
- **Apple Inc.** (Apple OAuth)

### Legal disclosure

- Court orders, criminal investigation, lawful agency requests
- Imminent life-safety situations

### Not shared with

- Advertisers
- Data brokers
- Marketing analytics firms (except via de-identified aggregates)

### Inter-user visibility

- Nickname, mode badge, category preferences
- Posts, applications, reflections
- After matching: chat messages and bookshelf quotes (when actively cited)

## 05　Cross-Border Transfer

- Supabase hosts may be in US / EU; FCM / APNs are global
- Transfer protections: EU Standard Contractual Clauses + Supabase SOC 2 Type II
- Transit encryption: TLS 1.2+
- At-rest encryption: AES-256
- By using the service, you consent to cross-border transfer

## 06　Retention

### During account lifetime

- Full retention to provide service

### After account deletion

- Personal data cleared within 30 days
- Statutory retention (tax, criminal investigation) per applicable law

### Specific retention periods

- 18+ verification hash: 1 year (prevent minor re-registration)
- Violation / suspension records (de-identified): 5 years
- Report records (incl. reported content): 1–3 years
- IP / login logs: 6 months – 1 year
- Payment records (future): 5–7 years (Commercial Accounting Act, Tax Collection Act)
- Pending criminal investigation data: until resolution
- Terms consent records (`user_tos_consents`): permanent (legal evidence)

### Bookshelf snapshots collected by others (Important)

- Messages collected by others persist as snapshots in their bookshelf
- **Snapshots are NOT auto-removed when you delete your account**
- We replace the displayed nickname with "User has left"
- Snapshots disappear only when the collector deletes them or their account
- Publishing constitutes consent to this mechanism

### Chat messages

- Retained until both parties delete the chatroom or both accounts
- One-sided account deletion: messages retained, nickname replaced with "User has left"

### Long-inactive accounts

- 12 consecutive months without login: notification email sent; deletion after 30 days of no response

## 07　Your Rights

### Per PDPA §3

- Inspect: know what we hold
- Request copy: obtain a copy
- Correct: amend (gender / DOB are locked, require review)
- Restrict processing: opt out of specific uses (e.g., push)
- Delete: delete account

### GDPR (EU users) additional rights

- Data portability: structured export
- Object to automated decision-making: about the matching algorithm
- Restrict processing
- Lodge complaint with DPA

### How to exercise

- Email [folio0427@gmail.com](mailto:folio0427@gmail.com)
- Reply within 30 days (identity verification required)

### Cases where we may decline or delay

- Legal prohibition
- Pending criminal investigation
- Substantial third-party impact
- Excessively frequent requests

## 08　Cookies & Similar Technologies

- Folio is a native app; primarily uses local storage (SharedPreferences / Keychain)
- Stores login tokens, user preferences (language, mode)
- Session token: Supabase JWT
- No third-party cookie tracking
- No identifier sharing with ad networks

## 09　Children's Privacy

- Service restricted to 18+
- We do not knowingly collect data from anyone under 18
- No targeted minor advertising; no consent-less minor matching
- Underage users: immediate termination + deletion
- Guardians may email folio0427@gmail.com to request deletion
- Processed within 7 business days

## 10　Data Security

- Transit: HTTPS / TLS 1.2+
- At rest: Supabase AES-256
- Passwordless auth: OAuth (Google / Apple)
- Access control: least privilege, Row Level Security (RLS)
- Log monitoring: anomaly detection
- Regular backups
- 100% security cannot be guaranteed; breach notification per PDPA §12

## 11　Change Notifications

### Multi-channel notice (industry-standard for guaranteed delivery)

- **L1 Push** (FCM / APNs): immediate for users with push enabled
- **L2 Email** (from OAuth): 99% delivery, evidentiary
- **L3 In-app banner**: visible on app open
- **L4 Blocking modal**: must check "I have read and agree" to continue

### Buffer period calculation

- 7 days **from when the user first sees the modal** (not from publish date)
- During buffer: agree / postpone / delete account
- After buffer without explicit consent: forced modal again, no checkbox = no continuation

### Change classification

- **Minor** (typos, restructuring): version bump, no notice
- **Material** (liability, jurisdiction, termination): all L1–L4 channels
- **New data collection / third-party sharing / purpose change**: forced modal re-consent, feature-limited if no consent, no buffer

## 12　Contact

- Email: [folio0427@gmail.com](mailto:folio0427@gmail.com)
- All data subject requests, complaints, exercises of rights via the same email
- Authority (Taiwan): National Communications Commission / Ministry of Justice (PDPA)
- Authority (EU): Your country's Data Protection Authority

---

> **Service is currently provided by an independent developer.** Upon company incorporation, we will update the controlling entity in this policy and notify users via the material change procedure.
