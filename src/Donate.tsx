
import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './components/donate/Modal';
import DonationForm from './components/donate/DonationForm';

type DonateProps = {
  children: ReactNode;
  className?: string;
};

export default function Donate({ children, className }: DonateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleDonate = () => {
    const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;

    if (isLargeScreen) {
      setIsOpen(true);
    } else {
      navigate('/donate');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleDonate}
        className={className}
      >
        {children}
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DonationForm />
      </Modal>
    </>
  );
}
