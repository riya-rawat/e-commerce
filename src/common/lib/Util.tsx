// For calling API -
export const fetchData = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
  };

  export const fetcher = (url: string) => fetch(url).then((res) => res.json());