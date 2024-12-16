<?php

namespace App\Controller;

use Ibexa\Bundle\Core\Controller;
use Ibexa\Core\MVC\Symfony\View\ContentView;
use Ibexa\Contracts\Core\Repository\ContentService;

class RideController extends Controller
{
    private $contentService;

    public function __construct(ContentService $contentService)
    {
        $this->contentService = $contentService;
    }

    public function viewRideWithLandmarksAction(ContentView $view)
    {
        //ride
        $currentContent = $view->getContent();
        //ids landmarks liés au ride
        $landmarksListId = $currentContent->getFieldValue('landmarks');

        //récupération du contenu des landmarks
        $landmarksList = [];
        foreach ($landmarksListId->destinationContentIds as $landmarkId) {
            $landmarksList[$landmarkId] = $this->contentService->loadContent($landmarkId);
        }

        $view->addParameters(['landmarksList' => $landmarksList]);

        return $view;
    }
}
