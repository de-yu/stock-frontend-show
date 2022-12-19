interface NavigationOption
{
  name: string;
  route: string;
}

interface NavigationHeader
{
  icon: string;
  name: string;
  route: string;
  options?: NavigationOption[];
}

interface CommonObject
{
  [key: string]: any;
}

interface TableHeader
{
  name: string;
  objectName: string;
  unit: string;
}

interface BooleanPassageType
{
  upper: number;
  lower: number;
}

interface QueryResponse {
  status: string;
  code: string;
  data: any;
}

interface SelectItem {
  text: string;
  value: string | number;
}
