import { Options } from "@contentful/rich-text-react-renderer";
import { INLINES } from "@contentful/rich-text-types";
export const linkOptions: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, next) => {
      return (
        <a href={node.data.uri} target="_blank" rel="noreferrer">
          {next}
        </a>
      );
    },
  },
};
