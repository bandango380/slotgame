#include <stdio.h>

#define BR_SIMBOLA 5
#define BR_SLOTOVA 12
#define REDOVI 3
#define KOLONE 4

int simboli[BR_SIMBOLA] = {1, 2, 3, 4, 5};
int matrica[12] = {0}
int brpoj[KOLONE][BR_SIMBOLA] = {0}
int brojk = 0;

int mul(){
    int rez = 0, i, j, k;
    for(j = 0;j<KOLONE;j++){
        for(k = 0;k<BR_SIMBOLA;k++){
            brpoj[j][K]=0;
        }
    }
    for(i = 0;i<BR_SLOTOVA;i++){
        brpoj[i/3][matrica[i]]++;
    }
    for(i = 0;i<BR_SIMBOLA;i++){
        int komb = 0;
        if(brpoj[0][i]&&brpoj[1][i]&&brojp[2][i]){
            if(brpoj[3][i]){
                komb = brpoj[0][i] * brpoj[1][i] * brpoj[2][i] * brpoj[3][i] * 2 * simboli[i];
            }
            else{
                komb = brpoj[0][i] * brpoj[1][i] * brpoj[2][i] * simboli[i];
            }
        }
        else {
            komb = 0;
        }
        rez+=komb;
    }
    return rez;
}

int main(){
    int kes = 0;
    while(1){
        kes+=mul();
        matrica[0]++;
        int i = 0;
        while(matrica[i]>=BR_SIMBOLA){
            matrica[i] = 0;
            if(i<BR_SLOTOVA-1){
                i++;
                matrica[i]++;
            }
            else{
                i++;
                break;
            }
        }
        if (i == BR_SLOTOVA) break;
    }
    printf("%lf", kes/2176782336.0)
    return 0;
}