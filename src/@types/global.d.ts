interface EventEmitter {
  listen(name: string, callback: Function)
  emit(name: string, param: any)
}

interface Window {
  mb: typeof EventEmitter
}

declare module 'manba' {
  function _Manba(): any
  function manba(p?: number): _Manba
  namespace _Manba {
    function distance(): number
    function format(reg: string): string
  }
  namespace manba {
    export const DAY: string
    export const YEAR: string
  }
  export default manba
}
