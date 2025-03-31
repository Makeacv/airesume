export default function BorderStyleButton({
  borderStyle,
  onChange,
}: BorderStyleButtonProps) {
  // ❌ REMOVE this line, it's unused now
  // const subscriptionLevel = useSubscriptionLevel();

  const premiumModal = usePremiumModal();

  function handleClick() {
    if (!canUseCustomizations()) {
      premiumModal.setOpen(true);
      return;
    }

    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  }

  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
      ? Circle
      : Squircle;

  return (
    <Button
      variant="outline"
      size="icon"
      title="Change border style"
      onClick={handleClick}
    >
      <Icon className="size-5" />
    </Button>
  );
}
