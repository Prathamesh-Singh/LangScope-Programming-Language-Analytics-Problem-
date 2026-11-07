// Can this user do `action` on `resource`?
// not logged in (public) -> read only
// admin  -> everything
// editor -> read, plus only the actions the admin has granted
export function can(user, action, resource) {
  if (action === "read") return true;
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.role === "editor") {
    return user.permissions.some((p) => p.action === action && p.resource === resource);
  }
  return false;
}

// Tables this user can change in any way (used to fill the admin menu)
export function editableResources(user, resources) {
  return resources.filter((r) => ["create", "update", "delete"].some((a) => can(user, a, r)));
}
