import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'; // Adjust import based on your UI library
import PropTypes from 'prop-types';

const ModalComp = ({ 
  isOpen, 
  onOpenChange, 
  title, 
  size,
  placement,
  content, 
  onAction, 
  btnTitle, 
  btnClose }) => {  
  return (
    <Modal 
      size={size}
      placement={placement}
      backdrop="opaque" 
      isOpen={isOpen} 
      isDismissable={false}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              {content}
            </ModalBody>
            <ModalFooter>
              <Button 
                color="danger" 
                variant="light" 
                onPress={onClose}
                size='sm'
              >
                {btnClose}
              </Button>
              <Button 
                size='sm'
                color="primary" 
                onPress={() => { onAction(); }}
              >
                {btnTitle}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

ModalComp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default ModalComp;
