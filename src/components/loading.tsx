import { imag } from "../assets";

// export function LoadingScreen({ url }: { url: string }) {
export function LoadingScreen(){
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-4 w-[580px] px-[48px] py-[68px] bg-surface-secondary rounded-sm">
        <img src={imag.icon} alt="Gov.ly logo" className="w-16 h-16" />

        <span className="font-bold text-3xl flex items-center justify-center gap-2">
          Redirecionando
          <div className="flex gap-2">
            <div className="animate-bounce [animation-delay:-0.3s] w-2 h-2 rounded-full bg-black" />
            <div className="animate-bounce [animation-delay:-0.15s] w-2 h-2 rounded-full bg-black" />
            <div className="animate-bounce w-2 h-2 rounded-full bg-black" />
          </div>
        </span>

        <span className="flex flex-col items-center text-text-secondary font-semibold text-center">
          <span>O link será aberto automaticamente em alguns instantes.</span>

          <span>
            Não foi redirecionado?{" "}
            <button
            //   onClick={() => (window.location.href = url)}
              className="text-blue-base hover:underline"
            >
              Acesse aqui
            </button>
          </span>
        </span>
      </div>
    </div>
  );
}
