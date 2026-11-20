import { $createClone } from "./_utils.ts";

class CommentClass extends dom.CharacterData {
  constructor(text: string = "") {
    super(text, "#comment", dom.NodeType.COMMENT_NODE);
  }

  [$createClone](): DOM.Comment {
    return new dom.Comment(this.data);
  }
}

globalThis.dom.Comment = CommentClass;

declare global {
  namespace DOM {
    type Comment = CommentClass;
  }
  interface DOM {
    Comment: typeof CommentClass;
  }
}
