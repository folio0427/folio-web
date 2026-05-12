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
- Terms consent records (`user_tos_consents`): **5 years** (legal evidence; auto-purged on expiry). Records include the `doc_type`, version, timestamp, method of your acceptance, plus a **salted SHA-256 hash of your email** (salt kept server-side, never held by the client). The hash is **one-way** and cannot be reversed to recover your email. Purpose: (a) after you delete your account, allow us to verify in litigation whether an email you claim is yours ever consented on Folio; (b) without retaining the plaintext email. This constitutes pseudonymisation under GDPR Art. 4(5) and is lawful.

### Bookshelf snapshots collected by others (Important)

- Messages collected by others persist as snapshots in their bookshelf
- **Snapshots are NOT auto-removed when you delete your account**
- We replace the displayed nickname with "User has left"
- Snapshots disappear only when the collector deletes them or their account
- Publishing constitutes consent to this mechanism

### Chat messages

- Retained until both parties delete the chatroom or both accounts
- One-sided account deletion: messages retained, nickname replaced with "User has left"

### Co-reading sticky notes (v2.2)

- Sticky notes you write inside a co-reading room (25% milestone, 100% milestone, free notes) appear on your reading partner's "notes wall" as a memento of your shared reading.
- You may also write purely-personal notes in your shelf (not associated with any co-reading partner).
- The other party cannot save your notes into their own shelf; they can only view them on your shared wall.
- They can select and copy text out, but plain text copied this way is no longer governed by Folio.

### Account deletion (v2.2.2 — "Leave Folio")

Choosing "Leave Folio" causes the platform to handle your data as follows:

**Fully cleared**
- Your Google / Apple sign-in link (auth.users record)
- Nickname, avatar, gender, birthdate, preference categories
- Your shelf, reviews, posts, pending applications
- Push notification settings (push token)

**Retained anonymously** (as a memento for your co-reading partners)
- Sticky notes you wrote in co-reading rooms
- Your messages in those rooms
- Author name shown as "A book friend who left"

**Legal basis**: Conversations and co-reading records are jointly produced by both parties (joint controllership); we have a legitimate interest in retaining them for the other party's continued use. Anonymisation removes the data from being personally identifiable, complying with PDPA / GDPR. This pattern matches LINE / WhatsApp / Discord and other messaging services.

**Future re-login**: Signing back in with the same Google / Apple account will be treated as a **brand-new user** requiring fresh registration. Sticky notes you wrote on partners' walls remain (anonymised) but are not linked to your new account.

**Processing**: takes effect immediately after you confirm "Leave Folio"; your auth account and personal data are removed from our servers in the same operation.

**Statutory retention (regardless of mode):**
- Terms-consent records (`user_tos_consents`) — **5 years** (incl. salted SHA-256 of email, non-reversible, auto-purged on expiry)
- Messages relevant to ongoing legal disputes or fraud investigations
- Anonymised data that cannot be traced to an individual

### Sign in with Apple revocation and account deletion (Important)

Apple lets you revoke Folio's authorization via **Settings → Apple ID → Password & Security → Sign in with Apple → Folio → Stop Using**.

**Please note: this action only revokes the Apple ID ↔ Folio link; it does NOT automatically delete your Folio account or data.** Apple and Folio are separate data controllers; revocation at the Apple layer cannot be construed as a deletion request directed at Folio.

**To fully delete your Folio account**, please use the in-app path: **"Me" tab → Settings → Leave Folio**. If that path is unavailable to you, you may also email a deletion request to folio0427@gmail.com.

**If you revoke Apple authorization without deleting in-app**: your Folio data persists until you actively delete in-app.

This handling matches industry practice (Bumble, Tinder, Hinge etc.); the goal is to prevent accidental data loss caused by third-party platform actions and ensure your deletion intent is direct, explicit, and traceable.

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
