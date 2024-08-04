import { useState } from 'react'

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  return {
    showModal,
    closeModal,
    modalProps: {
      open: isModalOpen,
      onCancel: closeModal,
      destroyOnClose: true,
      footer: null,
    },
  }
}

export default useModal
