import { useEffect, useState } from "react";
import jsPDF from "jspdf";

const key = "SHORT-LINKS-LIST";

type LinkItem = {
  id: string;
  link: string;
  short: string;
  access: string;
};
export function ShortLinkHook() {
  const [linkOriginal, setLinkOriginal] = useState("");
  const [buttonAction, setButtonAction] = useState<"create" | "edit">("create");
  const [shortLink, setShortLink] = useState("");
  const [linkId, setLinkId] = useState<string | null>(null);
  const [linkList, setLinkList] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const clear = () => {
    setLinkOriginal("");
    setShortLink("");
  };
  const normalizeUrl = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "https://" + url;
    }
    return url;
  };

  const handlerCreateShortLink = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!linkOriginal || !shortLink) return;

    const existShort = linkList.some((e) => e.short === shortLink);
    if (existShort) return;

    const id = Math.random().toString(36).substring(2);
    const existId = linkList.some((e) => e.id === id);
    if (existId) return;

    const newShort: LinkItem = {
      id,
      link: normalizeUrl(linkOriginal),
      short: shortLink,
      access: "0",
    };

    setLinkList((prev) => {
      const updated = [...prev, newShort];
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });

    clear();
  };

  const handlerEditShortLink = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!linkId) return;

    setLinkList((prev) => {
      const updated = prev.map((item) =>
        item.id === linkId
          ? {
              ...item,
              link: linkOriginal,
              short: shortLink,
              access: "0",
            }
          : item,
      );

      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });

    setButtonAction("create");
    setLinkId(null);
    clear();
  };

  const handlerEditLink = (id: string) => {
    const exist = linkList.find((e) => e.id === id);
    if (!exist) return;

    setLinkId(id);
    setLinkOriginal(exist.link);
    setShortLink(exist.short);
    setButtonAction("edit");
  };

  const handlerDeleteLink = (id: string) => {
    const filtered = linkList.filter((e) => e.id !== id);

    setLinkList(filtered);
    localStorage.setItem(key, JSON.stringify(filtered));
  };

const handlerOpenLink = async (id: string, url: string) => {
  setIsLoading(true);

  setLinkList((prev) => {
    const updated = prev.map((item) =>
      item.id === id
        ? { ...item, access: (Number(item.access) + 1).toString() }
        : item,
    );

    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  });

  // delay
  await new Promise((r) => setTimeout(r, 1500));

  setIsLoading(false);

  // redirect
  window.open(url, "_blank"); // nova aba
  // window.location.href = url; // mesma aba
};


  useEffect(() => {
    const stored = localStorage.getItem(key);
    const list = stored ? JSON.parse(stored) : [];
    setLinkList(list);
  }, []);

  const isDisabled = linkOriginal.length === 0 || shortLink.length === 0;

 const handlerDownloadCSV = () => {
   if (linkList.length === 0) {
     alert("Nenhum link para gerar CSV!");
     return;
   }

   // Criar uma instância do jsPDF
   const doc = new jsPDF({
     orientation: "portrait", // retrato
     unit: "mm",
     format: "a4",
   });

   doc.setFontSize(18);
   doc.text("Lista de Links Encurtados", 105, 15, { align: "center" });

   doc.setFontSize(12);
   const startY = 25; // altura inicial
   const rowHeight = 10; // altura entre linhas
   let y = startY;

   // Cabeçalho
   doc.text("Original", 20, y);
   doc.text("Curto", 100, y);
   doc.text("Acessos", 160, y);

   y += rowHeight;

   // Conteúdo
   linkList.forEach((item) => {
     doc.text(item.link, 20, y, { maxWidth: 70 }); // link original
     doc.text(item.short, 100, y, { maxWidth: 50 }); // link curto
     doc.text(item.access, 160, y); // número de acessos
     y += rowHeight;

     // Criar nova página se ultrapassar o limite
     if (y > 280) {
       doc.addPage();
       y = 20;
     }
   });

   // Salvar PDF
   doc.save("links-encurtados.pdf");
 };
 
  


  return {
    linkOriginal,
    isLoading,
    setLinkOriginal,
    shortLink,
    setShortLink,
    isDisabled,
    buttonAction,
    handlerCreateShortLink,
    handlerEditShortLink,
    linkList,
    handlerEditLink,
    handlerDeleteLink,
    handlerOpenLink,
    handlerDownloadCSV,
  };
}
