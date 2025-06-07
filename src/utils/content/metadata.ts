import { DEFAULT_METADATA, PAGE_METADATA, titleSeparator } from "@/constants/metadata";

import { CONFIG_CLIENT } from "@/config/client";

import { getOpenGraphImagePath } from "@/libs/api/open-graph/image-path";
import { getValueFromFunctionOrFallback } from "@/utils/data/objects";

import type { Metadata } from "@/types/common";
import type { PageMetadataKey } from "@/types/constants";

const { AUTHOR_NAME } = CONFIG_CLIENT;

/**
 * @description get page metadata
 * @returns {Metadata} page metadata
 */
const getPageMetadata = (path: PageMetadataKey): Metadata => {
  const pageSpecificMetadata = PAGE_METADATA[path];
  const image = getOpenGraphImagePath(path);

  const title = getValueFromFunctionOrFallback(
    pageSpecificMetadata,
    "getTitle",
    DEFAULT_METADATA.title
  );

  const description = getValueFromFunctionOrFallback(
    pageSpecificMetadata,
    "getDescription",
    DEFAULT_METADATA.description
  );

  const greeting = getValueFromFunctionOrFallback<string | undefined>(
    pageSpecificMetadata,
    "getGreeting",
    DEFAULT_METADATA.greeting
  );

  const metadata: Metadata = {
    title,
    description,
    image,
    author: AUTHOR_NAME,
  };

  if (greeting !== undefined) {
    metadata.greeting = greeting;
  }

  return metadata;
};

/**
 * @description handle title
 * @returns {Metadata} metadata
 */
const handleMetadataTitle = (metadata: Metadata) => {
  const { title: passedTitle } = metadata;
  const { title: defaultTitle } = DEFAULT_METADATA;

  const newMetadata = {
    ...metadata,
    title: passedTitle ? `${passedTitle}${titleSeparator}${AUTHOR_NAME}` : defaultTitle,
  };

  return newMetadata;
};

export { getPageMetadata, handleMetadataTitle };
