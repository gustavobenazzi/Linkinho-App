import { Header } from "../components/Header";
import React, { useState } from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  url: z.string().url(),
})

type FormData = z.infer<typeof schema>;

function App() {
  const [shortUrl, setShortUrl] = useState("");

  const { formState: { errors }, handleSubmit, register } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  const onSubmit = async (data: FormData) => {
    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const link = await response.json();
      setShortUrl(`http://localhost:3001/api/${link.slug}`);
    } else {
      const error = await response.json();
      console.error(error);
    }
  }


  return (
    <>
      <Header
        name="Linkinho"
        content="Pequeno no nome, grande na eficiência."
      />

      <Container>
        {/* main = container dentro do container */}
        <main className="bg-zinc-900 flex flex-col gap-y-8 h-[500px] mt-[100px] p-8 rounded-2xl">
          <div className="flex flex-col gap-y-2 text-center">
            <h1 className="text-4xl font-bold">Encurtador de links</h1>
            <p>Cole um linkão abaixo para torná-lo um Linkinho</p>
          </div>
          <form className="flex justify-center gap-x-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Coloque o link aqui!"
              className="w-96 input rounded-lg outline outline-2 outline-[#16a34a] border-0 font-sans bg-transparent outline-offset-[3px] p-[10px] px-4 transition duration-200 focus:outline-offset-[5px]"
              {...register("url")}
            />
            <Button variant="quaternary" type="submit">
              Diminuir!
            </Button>
            <p className="text-red-500">{errors.url?.message}</p>
          </form>
          {shortUrl && (
            <div className="flex justify-center mt-4">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {shortUrl}
              </a>
            </div>
          )}
        </main>
      </Container>
    </>
  );
}

export default App;
