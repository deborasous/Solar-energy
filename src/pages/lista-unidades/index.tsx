import { useState } from 'react';
import FormListUnit from '@/components/list-unit/formListUnit';
import FormRegisterUnit from '@/components/register-unit/FormRegisterUnit';

export default function ListUnit() {
  const [exibirFormulario, setExibirFormulario] = useState(false);

  const handleResgiter = () => {
    setExibirFormulario(true);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <div>
        {exibirFormulario ? (
          <FormRegisterUnit />
        ) : (
          <>
            <FormListUnit  handleResgiter={handleResgiter}/>
          </>
        )}
      </div>
    </main>
  );
}
