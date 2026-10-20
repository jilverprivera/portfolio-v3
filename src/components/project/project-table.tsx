import type { ReactNode } from "react";

// Tabla de Markdown con desplazamiento horizontal contenido dentro de su bloque (no en la página).
export function ProjectTable({ children }: { children: ReactNode }) {
  return (
    <div className="-mx-1 overflow-x-auto rounded-[8px] border border-white/15">
      <table className="w-full min-w-[480px] border-collapse text-left text-[15px] leading-[1.5]">
        {children}
      </table>
    </div>
  );
}
