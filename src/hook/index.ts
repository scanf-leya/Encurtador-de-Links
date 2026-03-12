import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import jsPDF from "jspdf";
import { api } from "../services";

export type LinkItem = {
  id: string;
  original: string;
  short: string;
  access: number;
};

export function useShortLinks() {
  const queryClient = useQueryClient();

  const [linkOriginal, setLinkOriginal] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [buttonAction, setButtonAction] = useState<"create" | "edit">("create");
  const [linkId, setLinkId] = useState<string | null>(null);

  // buscar links
  const { data: linkList = [], isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: api.getLinks,
  });

  // criar
  const createMutation = useMutation({
    mutationFn: api.createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      clear();
    },
  });

  // editar
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => api.updateLink(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      setButtonAction("create");
      setLinkId(null);
      clear();
    },
  });

  // deletar
  const deleteMutation = useMutation({
    mutationFn: api.deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const clear = () => {
    setLinkOriginal("");
    setShortLink("");
  };

  const normalizeUrl = (url: string) => {
    if (!url.startsWith("http")) {
      return "https://" + url;
    }
    return url;
  };

  const handlerCreateShortLink = (e: React.MouseEvent) => {
    e.preventDefault();

    createMutation.mutate({
      original: normalizeUrl(linkOriginal),
      short: shortLink,
    });
  };

  const handlerEditShortLink = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!linkId) return;

    updateMutation.mutate({
      id: linkId,
      data: {
        original: normalizeUrl(linkOriginal),
        short: shortLink,
      },
    });
  };

  const handlerEditLink = (link: LinkItem) => {
    setLinkId(link.id);
    setLinkOriginal(link.original);
    setShortLink(link.short);
    setButtonAction("edit");
  };

  const handlerDeleteLink = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handlerOpenLink = (short: string) => {
    window.open(`http://localhost:3333/links/${short}`, "_blank");
  };

  const handlerDownloadCSV = () => {
    const doc = new jsPDF();

    doc.text("Lista de Links", 20, 20);

    let y = 40;

    linkList.forEach((item: LinkItem) => {
      doc.text(item.original, 20, y);
      doc.text(item.short, 120, y);
      doc.text(String(item.access), 180, y);

      y += 10;
    });

    doc.save("links.pdf");
  };

  const isDisabled = linkOriginal.length === 0 || shortLink.length === 0;

  return {
    linkOriginal,
    setLinkOriginal,
    shortLink,
    setShortLink,
    buttonAction,
    isDisabled,
    linkList,
    isLoading,

    handlerCreateShortLink,
    handlerEditShortLink,
    handlerEditLink,
    handlerDeleteLink,
    handlerOpenLink,
    handlerDownloadCSV,
  };
}
