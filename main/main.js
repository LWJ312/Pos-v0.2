/**
 * Created by lwj_312 on 17-7-11.
 */
function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}

function createAllItems(inputs) {
    let loadresults=loadAllItems();
    let AllItems=[];
    let n=0;
    for(let input of inputs){
        for(let loadresult of loadresults){

            if(input===loadresult.barcode){
            AllItems[n]=loadresult;
            n++;
            }
        }

    }
    return AllItems;
}

function createNewItems(AllItems) {
    let NewItems=[];
    let n=0;
    let count=[];
    count[0]=1;
    for(let i=0;i<AllItems.length-1;i++)
    {
        NewItems[n]=AllItems[i];
        if(AllItems[i+1].barcode===AllItems[i].barcode) {
            if (i !== AllItems.length - 2)
                count[n]++;
            else {
                coun [n]++;
                NewItems[n].count = count[n];
            }
        }
        else{
            NewItems[n].count=count[n];
            n++;
            count[n]=1;
        }

    }
    if(AllItems[AllItems.length-1]!==AllItems[AllItems.length-2])
    {NewItems[n]=
        {
            barcode:AllItems[AllItems.length-1].barcode,
            name:AllItems[AllItems.length-1].name,
            unit:AllItems[AllItems.length-1].unit,
            price:AllItems[AllItems.length-1].price,
            count:count[n]
        };
    }
    return NewItems;
}

function buildsheet(NewItems) {
    let sheet=[];
    let calculatedprice=calculateprice(NewItems);
    for(let n=0;n<NewItems.length;n++)
    {

        sheet[n]={
            barcode:NewItems[n].barcode,
            name:NewItems[n].name,
            count:NewItems[n].count,
            unit:NewItems[n].unit,
            price:NewItems[n].price
        };

        sheet[n].subprice=calculatedprice.subprice[n];

    }
    sheet.total=calculatedprice.total;

    return sheet;
}

function calculateprice(NewItems) {
    let total=0;
    let subprice=[];
    for(let n=0;n<NewItems.length;n++)
    { subprice[n]=NewItems[n].count*NewItems[n].price;
        total+=subprice[n];
    }
    return{
        subprice,
        total};
}

function buildperstrings(onestuffsheet) {
    return`名称：${onestuffsheet.name}，数量：${onestuffsheet.count}${onestuffsheet.unit}，单价：${onestuffsheet.price.toFixed(2)}(元)，小计：${onestuffsheet.subprice.toFixed(2)}(元)`

}

function buildreceiptstrings(sheet) {
    let receiptstrings="";
    for(let n=0;n<sheet.length-1;n++)
    {  perstrings=buildperstrings(sheet[n])+'\n';
        receiptstrings+=perstrings;
    }
    receiptstrings+=buildperstrings(sheet[sheet.length-1]);
    return receiptstrings;
}

function showReceipt(sheet) {
    let receiptstrings=buildreceiptstrings(sheet);
    return`***<没钱赚商店>收据***
${receiptstrings}
----------------------
总计：${sheet.total.toFixed(2)}(元)
**********************`

}

const inputs = [
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000001',
    'ITEM000001',
    'ITEM000004'
];

function printReceipt(inputs)
{   let AllItems=createAllItems(inputs);
    let NewItems=createNewItems(AllItems);
    let sheet=buildsheet(NewItems);
    let result=showReceipt(sheet);
    console.log(result);
}

printReceipt(inputs);
