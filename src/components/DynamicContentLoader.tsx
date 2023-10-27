import React, { useState } from "react";
import useLRUCache from "../hooks/useLRUCache";

export interface DynamicContentLoaderProps {}

type LoadedContent = {
  id: number;
  text: string;
};

const DynamicContentLoader: React.FC<DynamicContentLoaderProps> = () => {
  const [loadedContent, setLoadedContent] = useState<LoadedContent[]>([]);
  const { get, put } = useLRUCache(3);

  const loadContent = async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const loadedContent: LoadedContent = {
      id,
      text: `Tab${id} Data`,
    };
    put(id.toString(), loadedContent);
    setLoadedContent((prev) => [...prev, loadedContent]);
  };

  const handleButtonClick = (id: number) => {
    const cachedContent = get(id.toString());
    if (cachedContent) {
      console.log(`Content ${id} loaded from cache`);
      setLoadedContent((prev) => [...prev, cachedContent]);
    } else {
      console.log(`Loading content ${id}`);
      loadContent(id);
    }
  };
  return (
    <div>
      <h2>Dynamic Content Loader with LRU Cache</h2>
      <button onClick={() => handleButtonClick(1)}>Tab 1</button>
      <button onClick={() => handleButtonClick(2)}>Tab 2</button>
      <button onClick={() => handleButtonClick(3)}>Tab 3</button>
      <button onClick={() => handleButtonClick(4)}>Tab 4</button>
      <button onClick={() => handleButtonClick(5)}>Tab 5</button>

      <div>
        <h3>Loaded Content</h3>
        <ul>
          {loadedContent.map((content, index) => (
            <li key={`${content.id}_${index}`}>{content.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DynamicContentLoader;
