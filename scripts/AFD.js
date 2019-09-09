
var numEstados=0;//variable global cuanta estados
var numAFD = 0;//variable global cuenta afns
var numTransiciones=0;//variable global cuenta transicioens


class AFD {
	
    search(S,Si){
        if(S.includes(Si))
            return S.indexOf(Si);
        return -1;
    }
  
  convertir_AFD(AFN){
        var i=1;
        var estado;
        var j=0;
        var id;
        var index;
        var S=[];
        var auxS=[];
        var auxSi=[];
        var transicion =[];
        var ftransicion =[];
        var queue = new Queue();
        var S0=[];
        id=AFN.findStartIndex();
        estado=AFN.estados[id];
        S0=AFN.cerradura_e(estado);
        S.push(S0);
        queue.enqueue(S0);
        while (!queue.isEmpty()) {
            auxS=queue.dequeue();
            // Para cada simbolo del alfabeto calculamos la operación IR_A
            AFN.alfabeto.forEach(element => {
                j=0;
                transicion.length=0;// Limpiando el arreglo
                auxSi=AFN.ir_a(auxS,element);
                //console.log(auxSi);
                //Si el resultado de IR_A no es vacios
                if(auxSi.lenght!=0){
                index=this.search(S,auxSi);
                //console.log(index);
                    //Si no se ha calculado IR_A para el conjunto Si
                    if(index==-1 ){
                        // Se agrega un nuevo estado
                        S.push(auxSi);
                        // Se encola para buscar más estados
                        queue.enqueue(auxSi);
                        transicion[j]=i;
                        i++;
                    }   
                    else
                        transicion[j]=index;
                }
                else
                  transicion[j]=-1;
                j++;
            });
            console.log(S);
            ftransicion.push(transicion);
        }
        var matriz=[S.length];
        for (let index = 0; index < ftransicion.length; index++) {
            matriz[index]=new Array(ftransicion[index]);
        }
        return matriz;
    }
}
