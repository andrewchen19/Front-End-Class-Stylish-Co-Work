import { useEffect, useState } from "react";

const useInfiniteScroll = (callback, option = { distance: 100 }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkScrollPosition = async () => {
      const scrollBottom =
        window.innerHeight + document.documentElement.scrollTop;
      const pageHeight = document.documentElement.offsetHeight;
      const isScrollToPosition = scrollBottom >= pageHeight - option.distance;

      if (isScrollToPosition && !isLoading) {
        setIsLoading(true);
        await callback();
        setIsLoading(false);
      }
    };

    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, [callback]);

  return { isLoading };
};

export default useInfiniteScroll;
