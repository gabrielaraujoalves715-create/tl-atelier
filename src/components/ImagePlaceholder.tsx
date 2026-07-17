type ImagePlaceholderProps = {
  className?: string;
  label?: string;
};

export function ImagePlaceholder({
  className = '',
  label = 'Adicionar imagem',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center border border-[#E8E2DF] bg-[#F6F3F1] text-[#8A817D] ${className}`}
    >
      <span className="text-sm font-normal">{label}</span>
    </div>
  );
}
