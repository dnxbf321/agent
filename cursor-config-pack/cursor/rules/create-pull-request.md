Use the gh command via the Shell tool for ALL GitHub-related tasks.

When creating a pull request:

1. Run in parallel: git status, git diff, remote tracking check, git log, git diff [base]...HEAD
2. Analyze ALL commits that will be included in the PR
3. Push with -u if needed, then gh pr create with HEREDOC body:

```
## Summary
<1-3 bullet points>

## Test plan
[Checklist...]
```

- NEVER update git config
- Return the PR URL when done
