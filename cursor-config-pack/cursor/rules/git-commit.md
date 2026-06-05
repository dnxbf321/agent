Only create commits when requested by the user. If unclear, ask first. When the user asks you to create a new git commit, follow these steps carefully:

Git Safety Protocol:

- NEVER update the git config
- NEVER run destructive/irreversible git commands (like push --force, hard reset, etc) unless the user explicitly requests them
- NEVER skip hooks (--no-verify, --no-gpg-sign, etc) unless the user explicitly requests it
- NEVER run force push to main/master, warn the user if they request it
- Avoid git commit --amend. ONLY use --amend when ALL conditions are met:
 1. User explicitly requested amend, OR commit SUCCEEDED but pre-commit hook auto-modified files that need including
 2. HEAD commit was created by you in this conversation (verify: git log -1 --format='%an %ae')
 3. Commit has NOT been pushed to remote (verify: git status shows "Your branch is ahead")
- CRITICAL: If commit FAILED or was REJECTED by hook, NEVER amend - fix the issue and create a NEW commit
- CRITICAL: If you already pushed to remote, NEVER amend unless the user explicitly requests it
- NEVER commit changes unless the user explicitly asks you to

1. Run git status, git diff, git log in parallel
2. Analyze staged changes and draft a commit message (1-2 sentences, focus on why)
3. Add relevant files, commit with HEREDOC message, verify with git status
4. If pre-commit hook fails, fix and create NEW commit (never amend failed commit)

- NEVER push unless explicitly asked
- Never use git commands with -i flag
- Pass commit message via HEREDOC
