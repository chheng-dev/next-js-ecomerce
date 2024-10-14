import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { TrendingDown, TrendingUp } from "lucide-react";

const CartTotal = ({ items }) => {
  return (
    <>
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card shadow="none" key={idx}>
            <CardBody className="px-3 text-small py-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-2 text-xs">{item.title}</p>
                  <p className="text-xl font-bold">40,680</p>
                </div>
                <div className={`rounded-full p-2 bg-[${item.bgColor}]`}>
                  <Icon className={`w-8 h-8 text-[${item.color}]`} />
                </div>
              </div>
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex gap-2 items-center">
                {
                  item.status === 'height' ?
                  <TrendingUp className="w-4 h-4 text-green-500" /> :
                  <TrendingDown className="w-4 h-4 text-red-600" />
                }
                <span className={`text-xs ${item.status === 'low' ? 'text-red-600' : 'text-green-500'}`}>{item.percentage}</span>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
};

export default CartTotal;
