#!/bin/bash

# Blog Post Migration Script
# Migrates posts from flat structure to year-based organization
# Usage: ./scripts/migrate-posts.sh

set -e  # Exit on error

POSTS_DIR="content/posts"
BACKUP_DIR="content/posts_backup_$(date +%Y%m%d_%H%M%S)"

echo "================================================"
echo "Blog Post Migration to Year-Based Structure"
echo "================================================"
echo ""

# Create backup
echo "Creating backup at $BACKUP_DIR..."
cp -r "$POSTS_DIR" "$BACKUP_DIR"
echo "✓ Backup created"
echo ""

# Define post-to-year mapping based on actual post dates
declare -A POST_YEARS
POST_YEARS["hello-world"]="2015"
POST_YEARS["hi-folks"]="2015"
POST_YEARS["aweseome-images"]="2020"
POST_YEARS["hello-guitar"]="2022"
POST_YEARS["editor-setup-hiboo"]="2023"
POST_YEARS["serve-home-server-with-true-fiber"]="2023"
POST_YEARS["server-cnn-models-with-fastapi"]="2025"
POST_YEARS["from-clicks-to-keystrokes-my-journey-into-the-vim-cult"]="2025"

# Migrate each post
echo "Migrating posts to year-based folders..."
echo ""

for POST_SLUG in "${!POST_YEARS[@]}"; do
  YEAR="${POST_YEARS[$POST_SLUG]}"
  OLD_PATH="$POSTS_DIR/$POST_SLUG"
  NEW_PATH="$POSTS_DIR/$YEAR/$POST_SLUG"

  if [ -d "$OLD_PATH" ]; then
    # Create year directory if it doesn't exist
    mkdir -p "$POSTS_DIR/$YEAR"

    # Move the post
    mv "$OLD_PATH" "$NEW_PATH"
    echo "✓ Moved $POST_SLUG → $YEAR/$POST_SLUG"
  else
    echo "⚠ Warning: $POST_SLUG not found, skipping..."
  fi
done

echo ""
echo "================================================"
echo "Migration Complete!"
echo "================================================"
echo ""
echo "Summary:"
echo "  - Backup created at: $BACKUP_DIR"
echo "  - Posts organized by year in: $POSTS_DIR"
echo ""
echo "New structure:"
tree -L 2 "$POSTS_DIR" 2>/dev/null || ls -la "$POSTS_DIR"
echo ""
echo "Note: If something went wrong, restore from backup:"
echo "  rm -rf $POSTS_DIR && mv $BACKUP_DIR $POSTS_DIR"
echo ""
