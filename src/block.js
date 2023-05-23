import ContentEditable from "react-contenteditable";

const Block = ({ html, handleChange, handleKeyDown }) => {
  return (
    <>
      <ContentEditable
        html={html} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        onChange={handleChange} // handle innerHTML change
        tagName="article" // Use a custom HTML tag (uses a div by default)
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default Block;
