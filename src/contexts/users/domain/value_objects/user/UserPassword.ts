import { InvalidArgumentError } from "@contexts/shared/domain/exceptions/InvalidArgumentError"
import { ValueObject } from "@contexts/shared/domain/value_objects/ValueObject"

export class UserPassword  extends ValueObject<string>{
  constructor(value: string) {
    super(value)
    this.isCorrectPassword(value)
  }

  private isCorrectPassword(value: string): void{
    
    const esValida = value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])/)

    if (esValida) return
    
    const tieneMinuscula = value.match(/^(?=.*[a-z])/)

    if (!tieneMinuscula)
        throw new InvalidArgumentError("The password must contain at least one lowercase letter.")


    const tieneMayuscula = value.match(/^(?=.*[A-Z])/)
    if (!tieneMayuscula)
      throw new InvalidArgumentError("The password must contain at least one uppercase letter.")


    const tieneNumero = value.match(/^(?=.*\d)/)
    if (!tieneNumero)
        throw new InvalidArgumentError("The password must contain at least one number.")


    const tieneEspeciales = value.match(/^(?=.*[$@$!%*?&])/)
    if (!tieneEspeciales)
        throw new InvalidArgumentError("La contraseña debe contener al menos un carácter especial.")


            //var tieneEspacios = Regex.IsMatch(clave, @"^([A-Za-z\d$@$!%*?&]|[^ ]){8,20}$");
            //if (!tieneEspacios)
            //    return new Respuesta("La clave no debe contener espacios.", Origen);

  }

}