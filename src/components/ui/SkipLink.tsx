interface SkipLinkProps {
  href: string;
  children: string;
}

export default function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="
        sr-only 
        focus:not-sr-only 
        focus:absolute 
        focus:top-4 
        focus:left-4 
        focus:z-50 
        bg-blue-600 
        text-white 
        px-4 
        py-2 
        rounded-md 
        text-sm 
        font-medium
        focus:ring-2 
        focus:ring-blue-500 
        focus:ring-offset-2
      "
    >
      {children}
    </a>
  );
}