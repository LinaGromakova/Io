import { useSettings } from '@/features/interface-state/lib/hooks';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';
import React from 'react';

export function ButtonUserProfile({
  type,
  uploadPhoto,
}: {
  type: 'edit' | 'base';
  uploadPhoto?: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const { toggleSettings } = useSettings();

  return (
    <>
      {type === 'base' ? (
        <ButtonCircle
          actionType="create"
          handlerClick={() => {
            toggleSettings();
          }}
          className="absolute bottom-0 right-0 overflow-hidden"
        ></ButtonCircle>
      ) : (
        <ButtonCircle
          handlerClick={() => null}
          actionType="photoAdd"
          className="absolute bottom-0 right-0 overflow-hidden"
        >
          <input
            type="file"
            name="image-file"
            accept=".jpg, .png"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (type === 'edit' && uploadPhoto) {
                  uploadPhoto(file);
                }
              }
            }}
            className="opacity-0 absolute p-20 top-0 left-0 w-full h-full cursor-pointer"
          />
        </ButtonCircle>
      )}
    </>
  );
}
