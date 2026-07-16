import fitz
from docx import Document
from pathlib import Path


def extract_pdf_text(path: str):
    """
    Extract text from a PDF file.
    """
    doc = fitz.open(path)

    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()

    return text


def extract_docx_text(path: str):
    """
    Extract text from a DOCX file.
    """
    doc = Document(path)

    text = ""

    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"

    return text


def parse_resume(path: str):
    """
    Automatically detect the file type and extract text.
    """
    extension = Path(path).suffix.lower()

    if extension == ".pdf":
        return extract_pdf_text(path)

    elif extension == ".docx":
        return extract_docx_text(path)

    raise ValueError("Unsupported file format")