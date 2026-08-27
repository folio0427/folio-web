# Folio Privacy Policy

> **Version** v1.8 ｜ **Effective Date** 2026-08-28 ｜ **Last Updated** 2026-08-28 ｜ **Status** Final

This policy describes how Folio collects, uses, stores, and shares your personal data, and your rights. For questions: [folio0427@gmail.com](mailto:folio0427@gmail.com).

---

## 01　Scope & Legal Basis

- Applies to Folio app and related services
- Primary: Taiwan Personal Data Protection Act (PDPA)
- EU users: GDPR
- United States users: the California Consumer Privacy Act (CCPA/CPRA) and other US state comprehensive privacy laws. We may not meet the "covered business" thresholds of these laws given our current scale, but we voluntarily extend the rights described below to residents of US states (see §07, "US State Privacy Rights")
- Hong Kong users: Personal Data (Privacy) Ordinance (PDPO, Cap. 486 of the Laws of Hong Kong), regulated by the Office of the Privacy Commissioner for Personal Data, Hong Kong (PCPD)
- Australian users: the Privacy Act 1988 and the Australian Privacy Principles (APPs), regulated by the Office of the Australian Information Commissioner (OAIC); online-safety matters are additionally governed by the Online Safety Act 2021, regulated by the eSafety Commissioner
- Macau users: Law No. 8/2005 (Personal Data Protection Act), regulated by the Personal Data Protection Bureau (DSPDP)
- App Store / Google Play privacy requirements observed

## 02　Data We Collect

### Provided at registration

- Google / Apple OAuth identifier (uid + email)
- Nickname
- Gender
- Date of birth (for 18+ verification + age display)
- Favorite book categories (max 10)
- Personality answers (up to 3, optional)
- Mode (Pure Book Friend / Open to Connection / Open)
- Desired gender (only when your mode is "Open to Connection" or "Open")
- Character styling (mascot appearance; not a real-life image)
- Region (optional free text you provide; may be left blank and edited anytime)
- The community your account belongs to (Chinese-speaking / International): determined at registration — devices with a Chinese interface are placed in the Chinese-speaking community automatically, while on a non-Chinese interface you choose it yourself during registration; **once set it cannot be changed** (you are warned before you submit)

### Generated through usage

- Posts (title, author, motivation, expected partner, weeks, progress, category)
- Applications (title, progress, motivation, self-offer, note)
- Chat messages (incl. canned, quotes, progress updates, and the excerpt of an original message you reply to)
- Reflections (25%, 100%, anytime)
- Reflection share cards (reflection text, book author, reading start/end dates, chosen template)
- Bookshelf (own books, book author, category, reading progress and page numbers, sticky notes)
- Study room (room name, bookcase and ornament arrangement, the paper-note stack outside the room, room visibility setting)
- Study-room interactions (likes you give to other users' rooms, comments you leave in other users' guestbooks)
- Match records (partner, per-stage unlock times, 100%-completion and celebration times, last-message time)
- Social connections (your friends list, friend and co-reading invitations you send or receive, your friend invite code)
- Drift bottles (letters you cast: a sticky note, a reflection, or a letter written on the spot; your replies and pen-pal correspondence; copies of others' letters you save; delivery and arrival status)
- Report and block data: when you report a post, a user, a study room, a guestbook comment, or a drift bottle / drift-bottle conversation, we record the target of your report, the reasons you select, and any explanation you provide, and the server captures a content snapshot at the time of the report as evidence for moderation and legal defense. Where the report targets a user, that snapshot may include the reported user's personal data (nickname, gender, date of birth, mode, personality answers), their recent posts, and the messages and sticky notes exchanged between you and that user in any shared co-reading room. Where the report targets a study room or a guestbook comment, the snapshot may include the room name, its paper-note stack, and the comment text; where it targets a drift bottle or a drift-bottle conversation, the snapshot includes the letter content. When you block a user, we record only the "blocker–blocked" relationship; the blocked user receives no notification. The foregoing report and block data is accessible only to Folio's moderation / administration personnel and only to the extent necessary.
- Device info: OS version, app version, language, push token, device and app-instance identifiers (incl. the Firebase Analytics App Instance ID)
- IP address (security and fraud prevention; Firebase Analytics masks it to derive coarse location)
- Coarse location: country / city level (derived from a masked IP, not precise positioning; via Firebase Analytics)
- Activity logs (login time, clicks, and per-screen dwell time and entry counts; partly collected via Firebase Analytics app-interaction events. The "per-screen dwell time and entry counts" are collected first-party (Supabase), linked to your account, used only for product improvement and usage analytics, not shared with third parties, and not used for advertising or profiling)
- Purchase and subscription status (when you buy a support plan: plan tier, purchase / renewal / expiry times, and store transaction / receipt identifiers; payment is processed by Apple / Google, and Folio never collects your card number)

### Not collected

- Real-life photos (no real-photo upload; character styling is a mascot appearance, not a real-life image)
- Bank, credit card information
- Precise GPS
- Contacts
- Phone number
- Microphone, camera (unless future feature with explicit consent)

### Sensitive personal data (note)

- Your mode (especially "Open to Connection") together with your desired gender may, when read together, reveal sensitive signals about your sexual orientation. Under the California CCPA/CPRA and several US state laws, such data is treated as "sensitive personal information."
- We use this data to **provide the matching service**: your **mode** drives the visibility matrix (who can see whom); your **desired gender** is only a preference signal shown to eligible peers and is **not itself used to filter** whom you see. We do **not** sell it, use it for advertising, or build advertising / marketing profiles from it. Our third-party analytics provider (Firebase) does **not** receive your mode, gender, or desired gender — only age and de-identified usage-flow events — so the sexual-orientation inference **never enters third-party analytics and is never used for advertising**. We do, however, review this data in our own admin console in **aggregate** form (for example the distribution of modes, mode × gender cross-tabs of how matches are composed, and conversion rates at each step of a feature), in order to understand how the service is used and improve the matching mechanism; those statistics are visible only to our administrators, are never sent to any third party, are not used for advertising or personalisation, and are never used to treat an individual user differently.
- You provide this data voluntarily (opt-in) at registration, and may change your mode / desired gender at any time on the "Me" page (7-day cooldown each).

## 03　Purposes

- Account creation, login, maintenance
- Matching algorithm
- 18+ verification
- Service improvement and usage analytics (DAU, funnel)
- Service announcements and important notices (shown in the app; may be sent per community)
- Fraud and abuse detection
- Customer service
- Legal compliance
- Marketing push (separately consented, withdrawable at any time free of charge). Service / transactional pushes (e.g., new messages, application notices, co-reading room status changes) are necessary to provide the service and are not direct marketing; marketing pushes require your separate, explicit opt-in, kept distinct from service pushes (aligned with Part 6A direct-marketing rules of Hong Kong's Personal Data (Privacy) Ordinance)

## 04　Third-Party Sharing

### Service providers (data processors)

- **Supabase Inc.** (database, storage, auth, Realtime) — Singapore host
- **Firebase Cloud Messaging (FCM) by Google LLC** (push) — global edge
- **Apple Push Notification service (APNs)** (iOS push) — global edge
- **Google LLC** (Google OAuth)
- **Apple Inc.** (Apple OAuth)
- **RevenueCat, Inc.** (subscription status management) — US host. When you purchase a support plan it receives: your Folio account identifier, the purchased product identifier, purchase / renewal / expiry times, and store receipt information, used to validate and sync your subscription status; it also processes the device and connection technical information necessary to operate the service, but never receives your name, email, card number, or any in-app content
- **Google Analytics for Firebase (Firebase Analytics) by Google LLC** (usage analytics: DAU, funnel) — global edge. Through this service Google collects: App Instance ID (a device-level identifier), coarse location (derived from a masked IP, not precise positioning), and app-lifecycle / product-interaction events. Folio attaches a small set of non-sensitive attributes (age) to certain feature events as analytics dimensions. Analytics data from this service is associated only with the device-level App Instance ID and is **not** linked to your Folio account identifier; Folio does **not** send your gender, desired gender, or mode to this service.

### Legal disclosure

- Court orders, criminal investigation, lawful agency requests
- Lawful requests from competent authorities in the regions where the service operates, including a cessation (anti-doxxing) notice issued by the Office of the Privacy Commissioner for Personal Data, Hong Kong (PCPD) under the Personal Data (Privacy) Ordinance, and lawful content-removal requests under Hong Kong law
- Imminent life-safety situations

### Not shared with

- Advertisers
- Data brokers
- Marketing analytics firms (except via de-identified aggregates)

We do **not sell** your personal information, and we do **not share** it for cross-context behavioral advertising; we embed no third-party advertising SDK and show no in-app ads.

### Inter-user visibility

- **Your community determines who you can see and who can see you**: posts in Explore, search results, other users' bookshelves and study rooms, friend invitations and friend codes, applications, drift-bottle matching and delivery, and the daily room exhibition all operate **within a single community only**; users in different communities cannot see each other. In-app announcements may likewise be sent per community
- Nickname, mode badge, category preferences, region (if provided)
- Supporter badge: while your support-plan subscription is active, Folio may show your supporter badge to other users on your profile (friends / co-reading rooms) and on post detail pages; the badge design differs by plan tier (so, when shown, other users can tell which tier you subscribe to). The actual display scope is as shown in the app, and the badge is no longer shown once the subscription ends
- Desired gender: conditionally shown on the other party's profile / post details per the filtering matrix, only when your mode is "Looking for fate" or "Open to either"
- Gender and age: shown on the other party's profile and in post details per the mode filtering matrix (gender is not shown to Pure-Book-Friend viewers; age is derived from your date of birth, and your full date of birth is not shown). You can enable hide toggles on the "Me" page so your gender / age are not shown to other users
- Posts, applications, reflections
- After matching: chat messages and sticky-note content you cite
- Study rooms: a room you set to "Public" enters the daily room exhibition and is shown to all users (room name, arrangement, paper-note stack, your avatar and nickname); a room set to "Unlisted" does not appear in Explore, but any signed-in user who knows the room link can still view it (the link itself grants access, so share it with care; viewing is blocked in both directions where a block exists between you and the viewer)
- Comments you leave in another user's guestbook are shown with your nickname to the room owner and that room's other visitors; for likes you give to another user's room, the owner receives a notification containing your nickname, while the room itself shows only an aggregate count and your identity is not shown to other visitors
- Drift bottles: letters you cast are delivered anonymously (shown as "A reader far away"); nicknames are revealed to each other only after both sides establish a pen-pal connection

## 05　Cross-Border Transfer

- The Supabase host is in Singapore; FCM, APNs, and Firebase Analytics are global; the RevenueCat host is in the US
- Transfer protections: EU Standard Contractual Clauses + Supabase SOC 2 Type II
- Personal data of Hong Kong users is likewise stored and processed outside Hong Kong (in Singapore and at global edge nodes). Hong Kong's Personal Data (Privacy) Ordinance currently imposes no data-localization requirement, and its cross-border transfer restriction (Section 33) is not yet in force; we nonetheless handle such transfers in line with the safeguards recommended by the Privacy Commissioner
- Personal data of Australian users is likewise stored and processed outside Australia (in Singapore and at global edge nodes). Under Australian Privacy Principle 8 we remain accountable for the handling by overseas recipients (Supabase in Singapore; Google / Apple at global edge nodes)
- Transit encryption: TLS 1.2+
- At-rest encryption: AES-256
- By using the service, you consent to cross-border transfer

## 06　Retention

### During account lifetime

- Full retention to provide service
- Accounts with **no sign-in for 24 consecutive months** are deleted automatically, together with their personal data; the scope of that deletion is the same as when you delete the account yourself (see "Account deletion" below). This corresponds to "Platform termination scenarios" in the Terms of Service

### After account deletion

- Personal data is cleared immediately once you confirm "Delete account" (see "Account deletion" below)
- Statutory retention (tax, criminal investigation) per applicable law

### Specific retention periods

- Violation, report, and related enforcement records (incl. reported content): retained for community safety, abuse prevention, and legal defense. After a report is **closed (actioned or dismissed) it is retained for 5 years and then automatically purged**; reports not yet resolved are kept until handled. The link to your account is removed after you delete your account
- Moderation action audit records (action type and time, a snapshot of the content at the time of the action, and the identifier of the person acted upon): retained to prevent suspension evasion, for community-safety auditing, and for legal defence; these records are **not removed when an account is deleted**. Once you delete your account, the identifier stored in such a record no longer resolves to any profile on our side
- Suspension-evasion hash (one-way salted SHA-256 of the OAuth sign-in identifier, used only to prevent re-registration evasion): auto-deleted 5 years after suspension; removed immediately upon unbanning. See "Suspension Notice & Appeal" in the Terms of Service for details
- IP / login logs: 6 months – 1 year
- Raw usage-analytics event records (app open times and counts, feature-tap events, time spent and entry counts per feature screen): retained for the lifetime of your account for product improvement and usage analysis, with **no fixed deletion period**; they are deleted together with your account when you delete it (including the automatic deletion after 24 months without sign-in described above)
- Anonymous aggregate statistics (daily counts of sign-ups, active users, posts, messages, co-reading rooms created and unlocked, and similar pure counts, containing **no user identifier**): **retained indefinitely**. Such data can no longer be traced back to any individual and is not personal data
- Payment and subscription event records (plan tier, purchase / renewal / expiry events, store and subscription-service transaction identifiers): kept as financial records for reconciliation, defence against refund disputes, and the retention duties imposed by the Commercial Accounting Act and the Tax Collection Act, with **no fixed deletion period**. Once you delete your account, the link between these records and your profile is removed (user_id set to NULL); the records still hold the store-side transaction identifiers and the account identifier used by the subscription service (RevenueCat) — the latter is deliberately kept because it is necessary for investigating refund disputes, and it no longer resolves to any profile on our side
- Pending criminal investigation data: until resolution
- Terms consent records (`user_tos_consents`): **5 years** (legal evidence; auto-purged on expiry). Records include the `doc_type`, version, timestamp, method of your acceptance, the **IP address and the device / browser identifier string (user-agent) at the moment of your consent**, plus a **salted SHA-256 hash of your email** (salt kept server-side, never held by the client). The hash is **one-way** and cannot be reversed to recover your email. Purpose: (a) after you delete your account, allow us to verify in litigation whether an email you claim is yours ever consented on Folio; (b) without retaining the plaintext email. This constitutes pseudonymisation under GDPR Art. 4(5) and is lawful.
- Terms-change notification delivery log (`tos_notification_log`): records the delivery and open status of terms-change notices (the channel currently in use is the in-app blocking modal) as evidence that we provided lawful notice; retained for the same period as the consent records, and the link to your account is removed (user_id set to NULL) after you delete your account.
- Drift bottles: copies of your letters saved by other users remain in the saver's letter box until they delete them; replies and conversations you decline, and content taken down due to expiry or moderation, are moved to an archive (for abuse prevention, operational statistics, and legal defense) and are no longer shown to regular users. **Letter contents in that archive are cleared automatically 2 years after archiving**; only the statistical fields recording type and time (which contain no letter content) are kept long-term for operational statistics

### Chat messages

- Retained until both parties delete the chatroom or both accounts
- One-sided account deletion: messages retained, author name replaced with "A book friend who left"

### Co-reading sticky notes

- Sticky notes you write inside a co-reading room (25% milestone, 100% milestone, free notes) appear on your reading partner's "notes wall" as a memento of your shared reading.
- You may also write purely-personal notes in your shelf (not associated with any co-reading partner).
- The other party cannot save your notes into their own shelf; they can only view them on your shared wall.
- They can select and copy text out, but plain text copied this way is no longer governed by Folio.

### Account deletion ("Delete account")

Choosing "Delete account" causes the platform to handle your data as follows:

**Fully cleared**
- Your Google / Apple sign-in link (auth.users record)
- Nickname, avatar, gender, birthdate, preference categories
- Your shelf (books and personal sticky notes), your study rooms (room, arrangement, paper-note stack, and the likes and guestbook comments the room received), reflection share cards, posts, unprocessed applications
- Push notification settings (push token)
- Social-connection data (friends list, friend and co-reading invitations, friend invite code, block list)

**Retained anonymously** (as a memento for your co-reading partners and other users)
- Sticky notes you wrote in co-reading rooms
- Your messages in those rooms
- Comments you left in other users' guestbooks
- Pen-pal correspondence from established connections (kept read-only as a memento on the other side; copies of your letters that others saved remain in their letter boxes; replies and deliveries that never became a pen-pal connection are deleted). Letters you cast that have already been moved to the archive because they expired, were declined, or were removed by moderation follow the archive rule above (contents cleared 2 years after archiving) and are not removed immediately when you delete your account
- Author name shown as "A book friend who left"

**Legal basis**: Conversations and co-reading records are jointly produced by both parties (joint controllership); we have a legitimate interest in retaining them for the other party's continued use. Anonymisation only removes the linkage to your account and displays the content as "A book friend who left"; to that extent it is no longer personally identifiable. However, where a message's own content contains information that identifies an individual (e.g. a self-entered name, address, or social handle), it may still constitute personal data, and we will handle such content in accordance with applicable law, a report, or your deletion request. This pattern matches LINE / WhatsApp / Discord and other messaging services.

**Future re-login**: Signing back in with the same Google / Apple account will be treated as a **brand-new user** requiring fresh registration. Sticky notes you wrote on partners' walls remain (anonymised) but are not linked to your new account.

**Processing**: takes effect immediately after you confirm "Delete account"; your auth account and personal data are removed from our servers in the same operation.

**Your subscription is not cancelled automatically**: deleting your Folio account does **not** cancel a support-plan subscription bought through the App Store or Google Play. Subscriptions are managed by the store and live in a separate system from your Folio account. If you have an active plan, **cancel it in the store's subscription settings first**, or the store will keep charging you on the original cycle.

**Statutory retention:**
- Terms-consent records (`user_tos_consents`) — **5 years** (incl. salted SHA-256 of email, non-reversible, auto-purged on expiry)
- Payment and subscription event records (kept after the link to your account is removed, for reconciliation, defence against refund disputes, and accounting / tax duties; see "Retention periods for specific data" above)
- Messages relevant to ongoing legal disputes or fraud investigations
- Anonymised data that cannot be traced to an individual

### Sign in with Apple revocation and account deletion (Important)

Apple lets you revoke Folio's authorization via **Settings → Apple ID → Password & Security → Sign in with Apple → Folio → Stop Using**.

**Please note: this action only revokes the Apple ID ↔ Folio link; it does NOT automatically delete your Folio account or data.** Apple and Folio are separate data controllers; revocation at the Apple layer cannot be construed as a deletion request directed at Folio.

**To fully delete your Folio account**, please use the in-app path: **"Me" tab → Settings → Account management → Delete account**. If that path is unavailable to you, you may also email a deletion request to folio0427@gmail.com.

**If you revoke Apple authorization without deleting in-app**: your Folio data persists until you actively delete in-app.

This handling matches industry practice (Bumble, Tinder, Hinge etc.); the goal is to prevent accidental data loss caused by third-party platform actions and ensure your deletion intent is direct, explicit, and traceable.

## 07　Your Rights

### Per PDPA §3

- Inspect: know what we hold
- Request copy: obtain a copy
- Correct: amend (gender / DOB are user-editable, with a 7-day cooldown after each change)
- Restrict processing: opt out of specific uses (e.g., push)
- Delete: delete account

### GDPR (EU users) additional rights

- Data portability: structured export
- Object to automated decision-making: about the matching algorithm
- Restrict processing
- Lodge complaint with DPA

### Hong Kong PDPO rights (Hong Kong users)

- Data Access Request (DAR): ask whether we hold, and what, your personal data, and obtain a copy
- Data Correction Request (DCR): request correction of inaccurate personal data
- Opt out of direct marketing: request, at any time and free of charge, that we cease using your personal data for direct marketing
- Right to lodge a complaint with the Office of the Privacy Commissioner for Personal Data, Hong Kong (PCPD)
- Response time: we respond within **40 days** of receiving a complete request, as required by the Personal Data (Privacy) Ordinance (in practice we generally process within 30 days)

### US State Privacy Rights (California CCPA/CPRA and other states with comprehensive privacy laws)

- **Right to know**: the categories of personal information we collect, their sources, purposes, and with whom we share them
- **Right to access / obtain a copy**, **delete**, and **correct**
- **Right to opt out of sale / sharing**: we do **not sell** and do **not share** your personal information for cross-context behavioral advertising, so no "Do Not Sell or Share My Personal Information" link is required
- **Right to limit use of sensitive personal information**: we use sensitive personal information only to provide the service (matching), never for advertising or profiling
- **No discrimination** for exercising these rights
- We may not meet each state law's thresholds given our current scale, but we extend these rights voluntarily; response time and how to exercise are as below

### Australian Privacy Rights (Australian Privacy Principles, Australian users)

- Right to access (APP 12): request access to the personal data we hold about you
- Right to correct (APP 13): request correction of inaccurate personal data
- Withdrawal of consent to sensitive information: signals relating to your sexual orientation are sensitive information, collected only with your consent; you may withdraw consent at any time (after which the related matching-display features will be limited)
- Data breach notification: in the event of an eligible data breach likely to cause serious harm, we notify you and the Office of the Australian Information Commissioner (OAIC) under Part IIIC of the Privacy Act
- Right to complain to the OAIC; for online-safety matters, you may also complain to the eSafety Commissioner (esafety.gov.au)

### Macau Personal Data Rights (Law No. 8/2005, Macau users)

- Right to access and correct your personal data
- Right to object to and request cessation of processing
- Right to complain to the Personal Data Protection Bureau (DSPDP, dspdp.gov.mo)

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
- No third-party browser cookie tracking
- We do not track you across third-party websites and do not respond to "Do Not Track" (DNT) browser signals; the app uses no third-party behavioral-advertising cookies. The only third party that processes usage data is Firebase Analytics (see §04)
- Usage analytics (Firebase Analytics, see §04) generate an "App Instance ID" on your device as an analytics identifier, and collect coarse location and app-interaction events
- Folio embeds no third-party advertising SDK, shows no in-app ads, and does not provide your identifiers to advertisers for ad targeting

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
- 100% security cannot be guaranteed; breach notification per Taiwan PDPA §12; for Australian users we additionally follow the Notifiable Data Breaches (NDB) scheme under Part IIIC of the Privacy Act, notifying the OAIC and affected individuals after assessment

## 11　Change Notifications

### Multi-channel notice (industry-standard for guaranteed delivery)

- **L1 Push** (FCM / APNs): immediate for users with push enabled
- **L2 Email** (from OAuth): 99% delivery, evidentiary
- **L3 In-app banner**: visible on app open
- **L4 Blocking modal**: must check "I have read and agree" to continue

### How consent takes effect

- When there is a **material change** (as classified below), you will see a blocking consent modal the next time you open the app
- You cannot continue using the service until you explicitly check "I have read and agree"
- The modal's options are: agree and continue / delete your account
- No buffer period — under GDPR / PDPA we must obtain valid consent before continuing to process your personal data, rather than granting a grace window afterwards

### Change classification

- **Minor** (typos, restructuring, clarifying additions within the existing scope of collection or processing): version bump; **takes effect silently, existing users are not interrupted**
- **Material** (liability, jurisdiction, termination): all L1–L4 channels
- **New data collection / third-party sharing / purpose change**: forced modal re-consent, feature-limited if no consent, no buffer

## 12　Contact

- Email: [folio0427@gmail.com](mailto:folio0427@gmail.com)
- All data subject requests, complaints, exercises of rights via the same email
- Authority (Taiwan): National Communications Commission / Ministry of Justice (PDPA)
- Authority (EU): Your country's Data Protection Authority
- Authority (Hong Kong): Office of the Privacy Commissioner for Personal Data (PCPD), https://www.pcpd.org.hk
- Authority (Australia): Office of the Australian Information Commissioner (OAIC, oaic.gov.au); online safety: eSafety Commissioner (esafety.gov.au)
- Authority (Macau): Personal Data Protection Bureau (DSPDP, dspdp.gov.mo)

---

> **Service is currently provided by an independent developer.** Upon company incorporation, we will update the controlling entity in this policy and notify users via the material change procedure.
