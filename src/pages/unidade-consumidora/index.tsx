import { useState } from 'react';
import FormListUnit from '@/components/form-list-unit/formListUnit';
import FormRegisterUnit from '@/components/form-register-unit/FormRegisterUnit';

export default function ListUnit() {
  const [exibirFormulario, setExibirFormulario] = useState(false);

  const handleResgiter = () => {
    setExibirFormulario(true);
  };

  return (
    <section>
      {exibirFormulario ? (
        <FormRegisterUnit />
      ) : (
        <>
          <FormListUnit handleResgiter={handleResgiter} />
        </>
      )}
    </section>
  );
}
