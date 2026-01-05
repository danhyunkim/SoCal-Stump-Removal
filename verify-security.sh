#!/bin/bash

# Security Verification Script
# Run this before committing to ensure credentials are protected

echo "🔒 Security Verification Checklist"
echo "=================================="
echo ""

# Check 1: Verify .env.local is ignored
echo "1. Checking if .env.local is ignored..."
if git check-ignore .env.local > /dev/null 2>&1; then
    echo "   ✅ .env.local is properly ignored"
else
    echo "   ❌ WARNING: .env.local is NOT ignored!"
    exit 1
fi

# Check 2: Verify .env.local exists
echo "2. Checking if .env.local exists..."
if [ -f .env.local ]; then
    echo "   ✅ .env.local exists (contains your real credentials)"
else
    echo "   ⚠️  .env.local not found (you'll need to create it)"
fi

# Check 3: Verify .env.example has no real credentials
echo "3. Checking .env.example for real credentials..."
if grep -qE "(eyJ|AIza|re_[A-Z]|echvrk)" .env.example; then
    echo "   ❌ DANGER: .env.example contains real credentials!"
    exit 1
else
    echo "   ✅ .env.example is safe (only placeholders)"
fi

# Check 4: Verify git won't commit .env.local
echo "4. Checking git status for .env files..."
if git status --short | grep -q ".env.local"; then
    echo "   ❌ DANGER: .env.local will be committed!"
    exit 1
else
    echo "   ✅ .env.local will not be committed"
fi

# Check 5: Verify only .env.example is tracked
echo "5. Checking tracked env files..."
ENV_FILES=$(git ls-files | grep "\.env" | wc -l | tr -d ' ')
if [ "$ENV_FILES" -eq 1 ]; then
    echo "   ✅ Only .env.example is tracked"
elif [ "$ENV_FILES" -eq 0 ]; then
    echo "   ⚠️  No env files tracked yet (will track .env.example on first commit)"
else
    echo "   ❌ WARNING: Multiple env files are tracked!"
    git ls-files | grep "\.env"
    exit 1
fi

echo ""
echo "=================================="
echo "✅ ALL SECURITY CHECKS PASSED!"
echo ""
echo "You can safely commit your code:"
echo "  git add ."
echo "  git commit -m \"Initial commit\""
echo "  git push origin main"
echo ""
