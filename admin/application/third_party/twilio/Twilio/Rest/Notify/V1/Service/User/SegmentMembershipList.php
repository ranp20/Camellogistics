<?php

/**
 * This code was generated by
 * \ / _    _  _|   _  _
 * | (_)\/(_)(_|\/| |(/_  v1.0.0
 * /       /
 */

namespace Twilio\Rest\Notify\V1\Service\User;

use Twilio\ListResource;
use Twilio\Values;
use Twilio\Version;

/**
 * PLEASE NOTE that this class contains beta products that are subject to change. Use them with caution.
 */
class SegmentMembershipList extends ListResource {
    /**
     * Construct the SegmentMembershipList
     * 
     * @param Version $version Version that contains the resource
     * @param string $serviceSid The service_sid
     * @param string $identity The identity
     * @return \Twilio\Rest\Notify\V1\Service\User\SegmentMembershipList 
     */
    public function __construct(Version $version, $serviceSid, $identity) {
        parent::__construct($version);

        // Path Solution
        $this->solution = array('serviceSid' => $serviceSid, 'identity' => $identity, );

        $this->uri = '/Services/' . rawurlencode($serviceSid) . '/Users/' . rawurlencode($identity) . '/SegmentMemberships';
    }

    /**
     * Create a new SegmentMembershipInstance
     * 
     * @param string $segment The segment
     * @return SegmentMembershipInstance Newly created SegmentMembershipInstance
     */
    public function create($segment) {
        $data = Values::of(array('Segment' => $segment, ));

        $payload = $this->version->create(
            'POST',
            $this->uri,
            array(),
            $data
        );

        return new SegmentMembershipInstance(
            $this->version,
            $payload,
            $this->solution['serviceSid'],
            $this->solution['identity']
        );
    }

    /**
     * Constructs a SegmentMembershipContext
     * 
     * @param string $segment The segment
     * @return \Twilio\Rest\Notify\V1\Service\User\SegmentMembershipContext 
     */
    public function getContext($segment) {
        return new SegmentMembershipContext(
            $this->version,
            $this->solution['serviceSid'],
            $this->solution['identity'],
            $segment
        );
    }

    /**
     * Provide a friendly representation
     * 
     * @return string Machine friendly representation
     */
    public function __toString() {
        return '[Twilio.Notify.V1.SegmentMembershipList]';
    }
}