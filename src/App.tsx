import { InputUI } from "./components/input";
import { Button } from "./components/ui/button";
import { LinkContainer } from "./components/link";
import { useShortLinks, type LinkItem } from "./hook";
import { LoadingScreen } from "./components/loading";
import { DownloadIcon, LinkIcon } from "@phosphor-icons/react";

function App() {
  const {
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
  } = useShortLinks();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="flex justify-center mt-15 w-full h-screen">
      <div className="flex flex-col gap-8">
        <span className="text-blue-base text-xl font-bold">Gov.ly</span>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="bg-surface-secondary w-95 rounded-sm">
            <form className="flex flex-col gap-6 p-8">
              <h1 className="font-bold">Novo link</h1>

              <InputUI
                label="LINK ORIGINAL"
                placeholder="www.example.com"
                value={linkOriginal}
                onChange={(e) => setLinkOriginal(e.target.value)}
              />

              <InputUI
                label="LINK ENCURTADO"
                placeholder="Gov.ly"
                value={shortLink}
                onChange={(e) => setShortLink(e.target.value)}
              />

              <Button
                disabled={isDisabled}
                onClick={
                  buttonAction === "create"
                    ? handlerCreateShortLink
                    : handlerEditShortLink
                }
              >
                {buttonAction === "create" ? "Salvar link" : "Editar link"}
              </Button>
            </form>
          </div>

          <div className="flex flex-col bg-surface-secondary w-95 h-min lg:w-145 rounded-sm p-8">
            <div className="flex justify-between border-b border-border-default p-4">
              <h1>Meus Links</h1>

              <Button
                disabled={linkList.length <= 0}
                variant="secondary"
                className="flex items-center gap-2"
                onClick={handlerDownloadCSV}
              >
                <DownloadIcon size={32} />
                Baixar CSV
              </Button>
            </div>

            {linkList.length <= 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 p-6 text-text-secondary">
                <LinkIcon size={50} />
                <h3>AINDA NÃO EXISTEM LINKS CADASTRADOS</h3>
              </div>
            ) : (
              linkList.map((link: LinkItem) => (
                <LinkContainer
                  key={link.id}
                  data={{ ...link, access: String(link.access) }}
                  // agora enviamos o objeto completo
                  edit={() => handlerEditLink(link)}
                  deleteItem={() => handlerDeleteLink(link.id)}
                  // handlerOpenLink espera apenas o short
                  open={() => handlerOpenLink(link.short)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
