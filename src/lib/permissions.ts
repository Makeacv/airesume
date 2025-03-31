

export function canCreateResume(
  subscriptionLevel: SubscriptionLevel,
  currentResumeCount: number,
) {
  const maxResumeMap: Record<SubscriptionLevel, number> = {
    free: 1,
    pro: 2,
    pro_plus: Infinity,
  };

  const maxResumes = maxResumeMap[subscriptionLevel];

  return currentResumeCount < maxResumes;
}

export function canUseAITools(subscriptionLevel: SubscriptionLevel) {
  // ✅ Allow AI tools for all subscription levels
  return true;
}

export function canUseCustomizations(subscriptionLevel: SubscriptionLevel) {
  // ✅ Allow customizations for all subscription levels
  return true;
}
