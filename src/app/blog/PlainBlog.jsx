export default function PlainBlog({ content, tcss }) {
    const getPlainText = (htmlContent) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const plainTextContent = getPlainText(content);

    return (
        <div className={tcss}>
            <p>{plainTextContent}</p>
        </div>
    );
}
