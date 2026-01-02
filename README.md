# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


{/* Administration */}
                    <div className="px-3 py-2">
                        {isSidebarOpen && (
                            <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                                Système
                            </h3>
                        )}
                        <div className="space-y-1">
                            <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={setOpenAccordion}>
                                <AccordionItem value="admin" className="border-b-0">
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <AccordionTrigger
                                                className={cn(
                                                    "py-2 hover:bg-white/10 hover:text-white hover:no-underline rounded-md px-4 text-sm font-medium",
                                                    !isSidebarOpen && "justify-center px-2 [&>svg]:hidden"
                                                )}
                                                onClick={handleAccordionTriggerClick}
                                            >
                                                <div className="flex items-center">
                                                    <Shield className={cn("h-4 w-4", isSidebarOpen ? "mr-2" : "")} />
                                                    {isSidebarOpen && <span>Administration</span>}
                                                </div>
                                            </AccordionTrigger>
                                        </TooltipTrigger>
                                        {!isSidebarOpen && (
                                            <TooltipContent side="right" className="flex items-center gap-4">
                                                Administration
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                    <AccordionContent className="pb-0 pl-10">
                                        <div className="space-y-1 mt-1">
                                            <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white">
                                                <Lock className="mr-2 h-4 w-4" />
                                                Rôles & Permissions
                                            </Button>
                                            <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white">
                                                <Activity className="mr-2 h-4 w-4" />
                                                Journal d'audit
                                            </Button>
                                            <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white">
                                                <Users className="mr-2 h-4 w-4" />
                                                Utilisateurs
                                            </Button>
                                            <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white">
                                                <Monitor className="mr-2 h-4 w-4" />
                                                Surveillance
                                            </Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>