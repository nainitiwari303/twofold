# Supabase — Phase 2

The app is currently a local-only demo. Do not connect a production project until the schema, membership model, and Row Level Security policies have been reviewed and tested.

Planned tables:

- `rooms`: room ID, unique join code, created timestamp
- `room_members`: room ID, authenticated user ID, display name
- `daily_questions`: question ID, local day, prompt, category
- `answers`: room ID, question ID, user ID, answer text, submitted timestamp

Security requirements before enabling a shared backend:

1. Enable RLS on every table exposed to the client.
2. Only room members may read room metadata or write their own answers.
3. Before both members submit, users must not be able to select the other member's answer. Enforce this with a secure database function/RPC or server-side endpoint; a client-side conditional is not a security boundary.
4. Validate room membership and one-answer-per-member-per-question constraints in the database.
5. Do not store secrets in `VITE_*` variables. Vite variables are bundled into browser code.
