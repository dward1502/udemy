#include <iostream>

int main() 
{
  std::cout << "Hello Mr.Hunt we need you to hack this terminal.";
  std::cout << std::endl;
  std::cout << "If you are not successfull you will be terminated!";

  const int CodeA = 1;
  const int CodeB = 2;
  const int CodeC = 4;

  const int CodeSum = CodeA + CodeB + CodeC;
  const int CodeProduct = CodeA * CodeB * CodeC;

  std::cout << std::endl << std::endl;
  std::cout << "There are 3 numbers in the code" << std::endl;
  std::cout << "The codes add-up to: " << CodeSum << std::endl;
  std::cout << "The codes multiply-to give :" << CodeProduct << std::endl;

  return 0;
}