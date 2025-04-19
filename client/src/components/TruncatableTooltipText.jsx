import React, { useRef, useState, useEffect } from "react";
import { Text, Tooltip } from "@chakra-ui/react";

const TruncatableTooltipText = ({ children, ...props }) => {
  const textRef = useRef();
  const [isTruncated, setIsTruncated] = useState(false);

  const checkTruncation = () => {
    const el = textRef.current;
    if (el) {
      setIsTruncated(el.scrollWidth > el.clientWidth);
    }
  };

  useEffect(() => {
    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [children]);

  const text = (
    <Text ref={textRef} isTruncated {...props}>
      {children}
    </Text>
  );

  return isTruncated ? (
    <Tooltip label={children} placement="top" hasArrow>
      {text}
    </Tooltip>
  ) : (
    text
  );
};

export default TruncatableTooltipText;
