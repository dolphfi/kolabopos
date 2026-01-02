import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";

const Dashboard: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold" >Dashboard</h1>
                </div>
            </CardContent>
            <CardFooter>
                <p>Dashboard</p>
            </CardFooter>
        </Card>
    );
};
export default Dashboard;
