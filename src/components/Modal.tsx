import React, { useState } from "react";
import "./modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string, description: string) => void;
  initialContent: string;
  initialDescription: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialContent,
  initialDescription,
}) => {
  const [editContent, setEditContent] = useState(initialContent);
  const [editDescription, setEditDescription] = useState(initialDescription);

  const handleSave = () => {
    onSave(editContent, editDescription);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div onClick={onClose} className="overlay"></div>
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#030303"
            fill="none"
          >
            <path
              d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="container__input">
          <input
            type="text"
            placeholder="Nome da tarefa"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <textarea
            className="descricao"
            placeholder="Descrição"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          ></textarea>
          <button type="submit" onClick={handleSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
