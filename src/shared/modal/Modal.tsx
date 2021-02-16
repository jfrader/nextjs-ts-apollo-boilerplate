import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { useTranslation } from '../../i18next';

interface IModalProps {
  open: boolean | unknown;
  children: React.ReactNode;
  onCancel?(): void;
  onAccept?(): void;
  actions?: React.ReactNode;
  title?: React.ReactNode;
  acceptText?: React.ReactNode;
  cancelText?: React.ReactNode;
  acceptDisabled?: boolean;
  cancelDisabled?: boolean;
  fullWidth?: boolean;
  maxWidth?: false | 'sm' | 'md' | 'xs' | 'lg' | 'xl';
}

export const Modal = ({
  open = false,
  onAccept,
  onCancel,
  actions,
  children,
  title,
  cancelText,
  acceptText,
  cancelDisabled,
  acceptDisabled,
  fullWidth,
  maxWidth = 'md',
}: IModalProps): JSX.Element => {
  const { t } = useTranslation('common');
  return (
    <Dialog aria-label="modal" open={!!open} onClose={onCancel} fullWidth={fullWidth} maxWidth={maxWidth}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {children && <DialogContent>{children}</DialogContent>}
      <DialogActions>
        {actions}
        {onCancel && (
          <Button
            aria-label="cancel"
            onClick={onCancel}
            disabled={cancelDisabled}
            color="secondary"
            endIcon={<ClearIcon />}
          >
            {cancelText || t('LITERAL_CANCEL')}
          </Button>
        )}
        {onAccept && (
          <Button
            aria-label="accept"
            onClick={onAccept}
            disabled={acceptDisabled}
            color="primary"
            endIcon={<CheckIcon />}
          >
            {acceptText || t('LITERAL_ACCEPT')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
