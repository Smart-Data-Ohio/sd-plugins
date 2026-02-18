# sd-actuals

Budget tracking plugin for Claude Code. Compares project estimates against actual Harvest time entries to provide budget health dashboards, burn rate projections, and early overrun warnings.

## Setup

Install the plugin in Claude Code. Requires:

- **sd-harvest** — for Harvest time entry data
- **sd-estimates** — for saved project estimates

Build the MCP server:

```bash
cd mcp-server
npm install
npm run build
```

## Commands

| Command             | Description                                         |
| ------------------- | --------------------------------------------------- |
| `/actuals:health`   | Project health dashboard with traffic-light status  |
| `/actuals:compare`  | Detailed estimate vs actual breakdown               |

## Skills

| Skill              | Triggers On                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| `budget-tracking`  | "budget status", "burn rate", "are we over budget", "project health"     |

## MCP Tools

| Tool               | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| `compare_estimate`  | Compute variance between an estimate and actual hours/cost |
| `get_burn_rate`     | Calculate weekly burn rate and trend from actuals data      |

## How It Works

1. Commands fetch time entries from Harvest via sd-harvest tools
2. Commands pass the actuals data to sd-actuals MCP tools
3. MCP tools read the estimate from `~/.sd-estimates/` and compute variance
4. Results are formatted as a health dashboard with budget status indicators
