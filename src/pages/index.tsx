import { Header } from "../components/Header";
import React, { useState } from "react";
import Container from "../components/Container";
import Button from "../components/Button";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleChange = (
    event: any /*{ target: { value: React.SetStateAction<string>; }; }*/
  ) => {
    setUrl(event.target.value);
  };

  const handleShorten = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(`${window.location.origin}/api/${data.slug}`);
      } else {
        alert("Failed to shorten the URL");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while shortening the URL");
    }
  };

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
          <div className="flex justify-center gap-x-4">
            <input
              type="text"
              placeholder="Coloque o link aqui!"
              value={url}
              onChange={handleChange}
              className="w-96 input rounded-lg outline outline-2 outline-[#16a34a] border-0 font-sans bg-transparent outline-offset-[3px] p-[10px] px-4 transition duration-200 focus:outline-offset-[5px]"
            />
            <Button variant="quaternary" onClick={handleShorten}>
              Diminuir!
            </Button>
          </div>
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
