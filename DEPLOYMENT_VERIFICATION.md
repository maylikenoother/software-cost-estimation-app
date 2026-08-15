# Deployment Verification

## Release

The modernised Software Cost Estimation tool was pushed to the `master` branch of `maylikenoother/software-cost-estimation-app` in commit `cb36b9a` on 15 August 2026.

Vercel reported the linked Git deployment as successful. The public application is available at <https://software-cost-estimation-app.vercel.app>.

## Checks completed

| Check | Result |
| --- | --- |
| Unit and component tests | 2 suites and 4 tests passed. |
| Production build | Passed with `NODE_ENV=production`. |
| Public `/start` route | Served the refreshed Scope & Cost workspace. |
| Estimation controls | Functional inventory, editable delivery assumptions, adjustment toggle, cost range, and calculation explanation were present. |
| Formula behaviour | A representative functional inventory updated the local preview from a zero scope to a non-zero effort and cost range as expected. |

## Important build note

The development shell exports `NODE_ENV=development`. Run a production build with `NODE_ENV=production npm run build` to prevent Next.js from mixing development and production runtime artifacts during pre-rendering.
